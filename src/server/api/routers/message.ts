import { createTRPCRouter,protectedProcedure,publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";



// model User {
//     id            String  @id @default(cuid())
//     name          String?
//     email         String?   @unique
//     emailVerified DateTime?
//     image         String?
//     accounts      Account[]
//     sessions      Session[]
//     posts         Post[]
//     projects      Project[]
//     education     Education?
//     experience    Experience?
//     about         About?
//     socialLinks   SocialLink?
//     skills        Skill[]
//     contact       Contact?
//     points        Int       @default(0)
//     comments      Comment[]
//     likes         Like[]
//     followedBy    User[]     @relation("UserFollows")
//     followings    User[]     @relation("UserFollows")
//     communities   Community[] @relation("CommunityMembers")
//     messagesSent  Message[]  @relation("MessagesSent")
//     messagesReceived Message[] @relation("MessagesReceived")
//      @@index([id])
// }
// model Community{
//     id String @id @default(cuid())
//     name String
//     description String? @db.Text
//     slug String? @unique
//     permissions Permission[]
//     members User[] @relation("CommunityMembers")
//     messages      Message[]  @relation("CommunityMessages")
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt
// }
// model Message {
//   id            String      @id @default(cuid())
//   text          String
//   sender        User        @relation("MessagesSent", fields: [senderId], references: [id])
//   senderId      String
//   recipient     User?       @relation("MessagesReceived", fields: [recipientId], references: [id])
//   recipientId   String?
//   community     Community?  @relation("CommunityMessages",fields: [communityId], references: [id])
//   communityId   String?
//   createdAt     DateTime   @default(now())
//   @@index([senderId])
//   @@index([recipientId])
//   @@index([communityId])
// }
export const messageRouter = createTRPCRouter({
    sendMessageToCommunity: protectedProcedure
    .input(z.object({
        communityId: z.string(),
        text: z.string(),
    }))
    .mutation(async ({input,ctx}) => {
        const {communityId,text} = input;
        const message = await ctx.prisma.message.create({
            data: {
                text,
                senderId: ctx.session.user.id,
                communityId,
            }
        })
        return message;
    }),
    sendMessageToUser: protectedProcedure
    .input(z.object({
        recipientId: z.string(),
        text: z.string(),
    }))
    .mutation(async ({input,ctx}) => {
        const {recipientId,text} = input;
        const message = await ctx.prisma.message.create({
            data: {
                text,
                senderId: ctx.session.user.id,
                recipientId,
            }
        })
        return message;
    }),
    getMessages: protectedProcedure
    .input(z.object({
        communityId: z.string().optional(),
        recipientId: z.string().optional(),
    }))
    .query(async ({input,ctx}) => {
        const {communityId,recipientId} = input;
        if(communityId){
            const messages = await ctx.prisma.message.findMany({
                where: {
                    communityId,
                },
                orderBy: {
                    createdAt: 'desc'
                },
                take: 20,
            })
            return messages;
        }
        if(recipientId){
            const messages = await ctx.prisma.message.findMany({
                where: {
                    OR: [
                        {
                            senderId: ctx.session.user.id,
                            recipientId,
                        },
                        {
                            senderId: recipientId,
                            recipientId: ctx.session.user.id,
                        }
                    ]
                },
                orderBy: {
                    createdAt: 'desc'
                },
                take: 20,
            })
            return messages;
        }
        throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'You must provide either a communityId or a recipientId',
        })
    }),
    getCommunityMessages: protectedProcedure
    .input(z.object({
        communityId: z.string(),
    }))
    .query(async ({input,ctx}) => {
        const {communityId} = input;
        const messages = await ctx.prisma.message.findMany({
            where: {
                communityId,
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                sender: true,
            },
            take: 20,
        })
        return messages;
    }),
    getUserMessages: protectedProcedure
    .input(z.object({
        recipientId: z.string(),
    }))
    .query(async ({input,ctx}) => {
        const {recipientId} = input;
        const messages = await ctx.prisma.message.findMany({
            where: {
                OR: [
                    {
                        senderId: ctx.session.user.id,
                        recipientId,
                    },
                    {
                        senderId: recipientId,
                        recipientId: ctx.session.user.id,
                    }
                ]
            },
            include: {
                 sender:{
                        select: {
                            id: true,
                            name: true,
                            image: true,
                        }}
                 },
            orderBy: {
                createdAt: 'desc'
            },
            take: 20,
        })
        return messages;
    }),

    



})