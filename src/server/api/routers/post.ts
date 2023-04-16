import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure,protectedProcedure } from "../trpc";
import slugify from "slugify";
import isDataURI from "validator/lib/isDataURI";
import { decode } from "base64-arraybuffer";
import { supabase } from "~/utils/supabaseClient";

// model Post {
//     id            String  @id @default(autoincrement())
//     title         String  @unique
//     description   String  @db.Text
//     slug          String?  @unique
//     featuredImage String?
//     text String? @db.Text
//     authorId String
//     author   User   @relation(fields: [authorId], references: [id])
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt
//     comments  Comment[]
//     likes     Like[]
//     @@index([authorId])
//   }
const LIMIT=20;
export const postRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx:{prisma} }) => {
        return prisma.post.findMany({
            take:LIMIT
        });
    }),


    createPost: protectedProcedure
    .input(z.object({
        title:z.string().min(1).max(50),
        description:z.string().min(10).max(100),
        text:z.string().min(10).max(1000),
        featuredImageAsDataUrl: z.string().refine((val) => isDataURI(val)),
    }))
    .mutation(async ({ ctx:{prisma,session}, input:{title,description,text,featuredImageAsDataUrl} }) => {
        // const { title, description, featuredImage, text } = input;
        const imageBase64Str = featuredImageAsDataUrl.replace(/^.+,/, "");

        const { data, error } = await supabase.storage
          .from("image")
          .upload(`blogs/${description}`, decode(imageBase64Str), {
            contentType: "image/png",
            upsert: true,
          });
          
        if (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "upload failed to supabase",
          });
        }
        const slug = slugify(title, { lower: true });
        const {
          data: { publicUrl },
        } = supabase.storage.from("image").getPublicUrl(data?.path);
        const post = await prisma.post.create({
            data: {
                title,
                description,
                slug,
                featuredImage: publicUrl,
                text,
                author: {
                    connect: {
                        id: session.user.id,
                },
            },
        },
        });
        return post;
    }),
    // updatePostFeaturedImage: protectedProcedure
    // .input(z.object({
        
    //     postId:z.string(),
    //     imageUrl:z.string().url(),
    // }))
    // .mutation(async ({ ctx:{prisma,session}, input:{postId,imageUrl} }) => {
    //     const postData = await prisma.post.findUnique({
    //         where: {
    //           id: postId,
    //         },
    //       });
  
    //       if (postData?.authorId !== session.user.id) {
    //         throw new TRPCError({
    //           code: "FORBIDDEN",
    //           message: "you are not owner of this post",
    //         });
    //       }
    //     const post = await prisma.post.update({
    //         where: {
    //             id: postId,
    //         },
    //         data: {
    //             featuredImage: imageUrl,
    //         },
    //     });
    //     return post;
    // }),
    // input:{limit,skip}
    getPostsOnTheBasisOfLikes: publicProcedure
    .input(z.object({
        // limit:z.number().min(1).max(100),
        // skip:z.number().min(0),
    }))
    .query(async ({ ctx:{prisma},  }) => {
        const posts = await prisma.post.findMany({
            // take:limit,
            // skip:skip,
            // orderBy: {
            //     likes: {
            //       _count: "desc",
            //     },
            //   },
              // include: {
              //   likes: true,
              // },
        });
        return posts;
    }),
    getPost: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ ctx: { prisma, session }, input: { slug } }) => {
      const post = await prisma.post.findUnique({
        where: {
          slug,
        },
        select: {
          id: true,
          description: true,
          title: true,
          text: true,
          likes: session?.user?.id
            ? {
                where: {
                  userId: session?.user?.id,
                },
              }
            : false,
          authorId: true,
          slug: true,
          featuredImage: true,
          createdAt: true,
          updatedAt: true,
          comments: {
            select: {
              id: true,
              text: true,
              createdAt: true,
              updatedAt: true,
            },
            orderBy: {
              createdAt: "desc",
            }
        },
        author: {
          select: {
            id: true,
            name: true,
            // email: true,
            image: true,
          },
        },
      },
      });

      return post;
    }),

  likePost: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .mutation(async ({ ctx: { prisma, session }, input: { postId } }) => {
      await prisma.like.create({
        data: {
          userId: session.user.id,
          postId,
        },
      });
    }),
    disLikePost: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .mutation(async ({ ctx: { prisma, session }, input: { postId } }) => {
      await prisma.like.delete({
        where: {
          userId_postId: {
            postId: postId,
            userId: session.user.id,
          },
        },
      });
    }),
    submitComment: protectedProcedure
    .input(
      z.object({
        text: z.string().min(3),
        postId: z.string(),
      })
    )
    .mutation(async ({ ctx: { prisma, session }, input: { text, postId } }) => {
      await prisma.comment.create({
        data: {
          text,
          user: {
            connect: {
              id: session.user.id,
            },
          },
          post: {
            connect: {
              id: postId,
            },
          },
        },
      });
    }),

  getComments: publicProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .query(async ({ ctx: { prisma }, input: { postId } }) => {
      const comments = await prisma.comment.findMany({
        where: {
          postId,
        },
        select: {
          id: true,
          text: true,
          user: {
            select: {
              name: true,
              image: true,
            },
          },
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return comments;
    }),
});