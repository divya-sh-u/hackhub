
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure,protectedProcedure } from "../trpc";
import slugify from "slugify";
import { prisma } from "~/server/db";

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
//     @@index([id])
// }
// model Community{
//     id String @id @default(cuid())
//     name String
//     description String? @db.Text
//     slug String? @unique
//     permissions Permission[]
//     members User[] @relation("CommunityMembers")
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt
// }
// model Permission{
//     id String @id @default(cuid())
//     name String? 
//     role role?
//     communityId String
//     community   Community   @relation(fields: [communityId], references: [id])
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt
//     @@index([communityId])
// }
// enum role{
//     ADMIN
//     MODERATOR
//     MEMBER
// }

export const communityRouter = createTRPCRouter({
    createCommunity: protectedProcedure
    .input(z.object({
        name:z.string().min(1).max(50),
        description:z.string().min(10).max(100),
    }))
    .mutation(async ({ ctx:{prisma,session}, input:{name,description} }) => {
        const slug = slugify(name, { lower: true });
        const community = await prisma.community.create({
            data:{
                name,
                description,
                slug,
                members:{
                    connect:{
                        id:session.user.id
                    }
                },
                permissions:{
                    create:{
                        role:"ADMIN"
                    }
                }
            }
        });
        return community;
    }),
    getCommunity:publicProcedure
    .input(z.object({
        communityId:z.string()
    }))
    .query(async ({ ctx:{prisma}, input:{communityId} }) => {
        const community = await prisma.community.findUnique({
            where: {
                id: communityId,
            },
            include :{
                members:true,
                permissions:true,
            }
        });
        return community;
    }),
    getAllCommunities:publicProcedure
    .query(async ({ ctx:{prisma} }) => {
        const communities = await prisma.community.findMany({
            include :{
                members:true,
                permissions:true,
            }
        });
        return communities;
    }),

    getCommunityBySlug:publicProcedure
    .input(z.object({
        slug:z.string()
    }))
    .query(async ({ ctx:{prisma}, input:{slug} }) => {
        const community = await prisma.community.findUnique({
            where: {
                slug: slug,
            },
            include :{
                members:true,
                permissions:true,
            }
        });
        return community;
    }),

    createCommunityMember: protectedProcedure
    .input(z.object({
        communityId:z.string(),
    }))
    .mutation(async ({ ctx:{prisma,session}, input:{communityId} }) => {
        const community = await prisma.community.findUnique({
            where: {
                id: communityId,
            },
            include :{
                members:true,
                permissions:true,
            }
        });
        if(!community){
            throw new TRPCError({code:"NOT_FOUND",message:"Community not found"});
        }
        const member = await prisma.user.findUnique({
            where: {
                id: session.user.id,
            },
            include :{
                communities:true,
            }
        });
        if(!member){
            throw new TRPCError({code:"NOT_FOUND",message:"User not found"});
        }
        const isMember = member.communities.find((community)=>community.id === communityId);
        if(isMember){
            throw new TRPCError({
                code : "PARSE_ERROR",
                message:"User is already a member of this community"
            });
        }
        const newMember = await prisma.user.update({
            where: {
                id: session.user.id,
            },
            data:{
                communities:{
                    connect:{
                        id:communityId
                    }
                }
            },
            include :{
                communities:true,
            }
        });
        return newMember;
    }),
    deleteCommunityMember: protectedProcedure
    .input(z.object({
        communityId:z.string(),
    }))
    .mutation(async ({ ctx:{prisma,session}, input:{communityId} }) => {
        const community = await prisma.community.findUnique({
            where: {
                id: communityId,
            },
            include :{
                members:true,
                permissions:true,
            }
        });
        if(!community){
            throw new TRPCError({code:"NOT_FOUND",message:"Community not found"});
        }
        const member = await prisma.user.findUnique({
            where: {
                id: session.user.id,
            },
            include :{
                communities:true,
            }
        });
        if(!member){
            throw new TRPCError({code:"NOT_FOUND",message:"User not found"});
        }
        const isMember = member.communities.find((community)=>community.id === communityId);
        if(!isMember){
            throw new TRPCError({
                code : "PARSE_ERROR",
                message:"User is not a member of this community"
            });
        }
        const newMember = await prisma.user.update({
            where: {
                id: session.user.id,
            },
            data:{
                communities:{
                    disconnect:{
                        id:communityId
                    }
                }
            },
            include :{
                communities:true,
            }
        });
        return newMember;
    }),
})
// getProject:publicProcedure
// .input(z.object({
//     projectId:z.string()
// }))
// .query(async ({ ctx:{prisma}, input:{projectId} }) => {
//     const project = await prisma.project.findUnique({
//         where: {
//             id: projectId,
//         },
//         include :{
//             likes:true,
//             comments:true,
//         }
//     });
//     return project;
// }),