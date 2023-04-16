import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure,protectedProcedure } from "../trpc";
import  isDataURI  from 'validator/lib/isDataURI';
import { decode } from "base64-arraybuffer";
import { createClient } from "@supabase/supabase-js";
import { supabase } from '~/utils/supabaseClient';
import { env } from "~/env.mjs";
import slugify from "slugify";

const LIMIT=20;
export const projectRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx:{prisma} }) => {
        return prisma.project.findMany({
            take:LIMIT
        });
    }),
    createProject: protectedProcedure
    .input(z.object({
        title:z.string().min(1).max(100),
        description:z.string().min(10).max(500),
        link:z.string().url(),
        videoLink:z.string().url(),
        image:z.string(),
        technologies:z.array(z.string()),
        problemItSolves:z.string().min(10).max(1000),
        blogPostLink:z.string().url(),
        imageAsDataUrl: z.string().refine((val) => isDataURI(val)),
    }))
    .mutation(async ({ ctx:{prisma,session}, input:{title,description,link,videoLink,image,technologies,problemItSolves,blogPostLink,imageAsDataUrl} }) => {
        // const { title, description, featuredImage, text } = input;
        const imageBase64Str = imageAsDataUrl.replace(/^.+,/, "");

      const { data, error } = await supabase.storage
        .from("image")
        .upload(`projects/${title}`, decode(imageBase64Str), {
          contentType: "image/png",
          upsert: true,
        });
        
      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "upload failed to supabase",
        });
      }
      const {
        data: { publicUrl },
      } = supabase.storage.from("image").getPublicUrl(data?.path);
        const slug = slugify(title, { lower: true });
        const project = await prisma.project.create({
            data: {
                title,
                description,
                slug,
                link,
                videoLink,
                image,
                technologies,
                problemItSolves,
                blogPostLink,
                snapshot: publicUrl,
                user: {
                    connect: {
                        id: session.user.id,
                        
                },
                
            },
        },
        });
        return project;
    }),
    likeProject:protectedProcedure
    .input(z.object({
        projectId:z.string()
    }))
    .mutation(async ({ ctx:{prisma,session}, input:{projectId} }) => {
        const like = await prisma.like.create({
            data: {
                project: {
                    connect: {
                        id: projectId,
                    },
                },
                user: {
                    connect: {
                        id: session.user.id,
                    },
                },
            },
        });
        return like;
    }),
    unlikeProject:protectedProcedure
    .input(z.object({
        projectId:z.string()
    }))
    .mutation(async ({ ctx:{prisma,session}, input:{projectId} }) => {
        const like = await prisma.like.delete({
            where: {
                userId_postId
                : {
                    userId: session.user.id,
                    postId: projectId,
                },
            },
        });
        return like;
    }),
    commentOnProject:protectedProcedure
    .input(z.object({
        projectId:z.string(),
        text:z.string().min(1).max(1000)
    }))
    .mutation(async ({ ctx:{prisma,session}, input:{projectId,text} }) => {
        const comment = await prisma.comment.create({
            data: {
                text,
                project: {
                    connect: {
                        id: projectId,
                    },
                },
                user: {
                    connect: {
                        id: session.user.id,
                    },
                },
            },
        });
        return comment;
    }),
    getCommentsOnProject:publicProcedure
    .input(z.object({
        projectId:z.string()
    }))
    .query(async ({ ctx:{prisma}, input:{projectId} }) => {
        const comments = await prisma.comment.findMany({
            where: {
                projectId,
            },
            include: {
                user: true,
            },
        });
        return comments;
    }),

    addTeamMemberToProject:protectedProcedure
    .input(z.object({
        projectId:z.string(),
        name:z.string().min(1).max(100),
        role:z.string().min(1).max(100)
    }))
    .mutation(async ({ ctx:{prisma,session}, input:{projectId,name,role} }) => {
        const teamMember = await prisma.teamMember.create({
            data: {
                name,
                role,
                project: {
                    connect: {
                        id: projectId,
                    },
                },
            },
        });
        return teamMember;
    }),

    getProject:publicProcedure
    .input(z.object({
        projectId:z.string()
    }))
    .query(async ({ ctx:{prisma}, input:{projectId} }) => {
        const project = await prisma.project.findUnique({
            where: {
                id: projectId,
            },
            include :{
                likes:true,
                comments:true,
            }
        });
        return project;
    }),
    showableProjectsSortedOnTheBasisOfLikes:publicProcedure.query(async ({ ctx:{prisma} }) => {
        const projects = await prisma.project.findMany({
            orderBy: {
                likes: {
                    _count: "desc",
                },
            },
            select: {
                id: true,
                title: true,
                description: true,
                slug: true,
                link: true,
                image: true,
                snapshot: true,
                likes: {
                    select: {
                        id: true,
                    },
                },
            },
            take:LIMIT
        });
        return projects;
    }),
    getLikesOnProject:publicProcedure
    .input(z.object({
        projectId:z.string()
    }))
    .query(async ({ ctx:{prisma}, input:{projectId} }) => {
        const likes = await prisma.like.findMany({
            where: {
                projectId,
            },
        });
        return likes;
    }),
    


    
    });
        // model TeamMember{
    //     id String @id @default(cuid())
    //     name String?
    //     role String?
    //     projectId String
    //     project   Project   @relation(fields: [projectId], references: [id])
    //     createdAt DateTime @default(now())
    //     updatedAt DateTime @updatedAt
    //     @@index([projectId])
    // }
    // model Comment {
//     id String @id @default(cuid())
//     text String @db.Text
//     userId String
//     postId String?
//     projectId String?
//     project   Project?   @relation(fields: [projectId], references: [id])
//     user   User   @relation(fields: [userId], references: [id])
//     post   Post?   @relation(fields: [postId], references: [id])
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt
//     @@index([userId])
//     @@index([postId])
//   }
//   model Like {
//     id String @id @default(cuid())
//     userId String
//     postId String?
//     projectId String?
//     project   Project?   @relation(fields: [projectId], references: [id])
//     user   User   @relation(fields: [userId], references: [id])
//     post   Post?   @relation(fields: [postId], references: [id])
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt
//     @@unique([userId, postId])
//     @@index([postId])
//   }
//   model Project{
//       id String @id @default(cuid())
//       title String
//       description String @db.Text
//       slug String @unique
//       link String
//       videoLink String
//       comments  Comment[]
//       likes     Like[]
//       image String
//       technologies String[]
//       problemItSolves String? @db.Text
//       blogPostLink String? 
//       userId String
//       user   User   @relation(fields: [userId], references: [id])
//       createdAt DateTime @default(now())
//       updatedAt DateTime @updatedAt
//       @@index([userId])
//   }