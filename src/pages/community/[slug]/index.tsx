import * as React from 'react';
import { LayoutWithSideBar } from '~/Layout/LayoutWithSidebar';
import {Router,useRouter} from 'next/router';
import { api } from '~/utils/api';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export interface IAppProps {
}

export default function App (props: IAppProps) {

  const router = useRouter();

  const getCommunityBySlug = api.community.getCommunityBySlug.useQuery({
    slug: router.query.slug as string,
  })

  const createCommunityMember = api.community.createCommunityMember.useMutation()

  const deleteCommunityMember = api.community.deleteCommunityMember.useMutation()

  const sendMessageToCommunity = api.message.sendMessageToCommunity.useMutation()

  const getCommunityMessages = api.message.getCommunityMessages.useQuery({
    communityId:getCommunityBySlug.data?.id as string
  })

  const {register,handleSubmit,reset} = useForm()
  return (
    <LayoutWithSideBar>
      <div className='container mx-auto mt-10 px-4'>
  <h1 className='text-center text-3xl font-bold mb-5'>
    {getCommunityBySlug.data?.name}
  </h1>
  <div className='flex flex-col mb-5 bg-blue-100 p-5 rounded-lg'>
    <h2 className='font-bold text-gray-800'>Description:</h2>
    <h3 className='mt-2 text-gray-400'>{getCommunityBySlug.data?.description}</h3>
  </div>
  <div className='flex items-center mb-5 space-x-3'>
    <h3 className='text-xl font-bold mr-3'>
      {getCommunityBySlug.data?.members.length}
    </h3>
    <button 
      className='bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
      onClick={()=>{
        createCommunityMember.mutate({
          communityId:getCommunityBySlug.data?.id as string
        },
        {
          onSuccess:()=>{
            toast.success("Joined Community")
          }
        })
      }}>
      Join
    </button>
    <button 
      className='bg-red-500 m-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'
      onClick={()=>{
        deleteCommunityMember.mutate({
          communityId:getCommunityBySlug.data?.id as string
        },
        {
          onSuccess:()=>{
            // getCommunityBySlug.refetch()
            toast.success("Left Community")
            router.push("/community")
          }
        })
      }}>
      Leave
    </button>
  </div>
  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-5'>
    {getCommunityBySlug.data?.permissions.map((permission)=>{
      return (
        <div key={permission.id} className='p-5 bg-gray-100 rounded-lg'>
          <h4 className='font-bold text-gray-500'>{permission.name}</h4>
          <p>{permission.role}</p>
        </div>
      )
    })}
  </div>
  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 text-gray-400'>
    {getCommunityBySlug.data?.members.map((member)=>{
      return (
        <div key={member.id} className='p-5 bg-gray-100  rounded-lg'>
          <h4 className='font-bold text-gray-500'>{member.name}</h4>
          <p>{member.points}</p>
          <img src={member.image as string} alt={member.name as string} className='w-10 h-10 rounded-full object-cover' />
        </div>
      )
    })}
  </div>
  <form 
    onSubmit={handleSubmit((data)=>{
      sendMessageToCommunity.mutate({
        communityId:getCommunityBySlug.data?.id as string,
        text:data.text
      },
      {
        onSuccess:()=>{
          getCommunityMessages.refetch()
          toast.success('Message sent')
          reset()
        }
      })
    })}
    className='mb-5'>
    <input 
      {...register("text")} 
      type="text" 
      placeholder='Type your message...'
      className='border border-gray-400 text-black  rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full'
    />
    <button 
      type="submit"
      className='bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'>
      Send
    </button>
  </form>
  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
    {getCommunityMessages.data?.map((message)=>{
      return (
        <div key={message.id} className='p-5 bg-gray-400 rounded-lg'>
          <h4 className='font-bold'>{message.sender.name}</h4>
          <p>{message.text}</p>
          <img src={message.sender.image as string} alt={message.sender.name as string} className='w-10 h-10 rounded-full object-cover' />
        </div>
      )
    })}
  </div>
</div>
    </LayoutWithSideBar>
  );
}
{/* </div> */}
// import router from 'next/router';
// import * as React from 'react';
// import { api } from '~/utils/api';
// import { useForm } from 'react-hook-form';
// export interface IAppProps {
// }

// export default function App (props: IAppProps) {

//   const getCommunityBySlug = api.community.getCommunityBySlug.useQuery({
//     slug: router.query.slug as string,
//   })

//   const createCommunityMember = api.community.createCommunityMember.useMutation()

//   const deleteCommunityMember = api.community.deleteCommunityMember.useMutation()

//   const sendMessageToCommunity = api.message.sendMessageToCommunity.useMutation()

//   const getCommunityMessages = api.message.getCommunityMessages.useQuery({
//     communityId:getCommunityBySlug.data?.id as string
//   })

//   const {register,handleSubmit,reset} = useForm()

//   return (
//     <div>
//       <h1>Community</h1>
//       <h2>{getCommunityBySlug.data?.name}</h2>
//       <h3>{getCommunityBySlug.data?.description}</h3>
//       <h3>{getCommunityBySlug.data?.members.length}</h3>
//       <button onClick={()=>{
//         createCommunityMember.mutate({
//           communityId:getCommunityBySlug.data?.id as string
//         },
//         {
//           onSuccess:()=>getCommunityBySlug.refetch()
//         })
//       }}>Join</button>
//       <button onClick={()=>{
//         deleteCommunityMember.mutate({
//           communityId:getCommunityBySlug.data?.id as string
//         },
//         {
//           onSuccess:()=>{
//             getCommunityBySlug.refetch()
//             router.push("/community")
//           }
//         })
//       }}>Leave</button>
//       {getCommunityBySlug.data?.permissions.map((permission)=>{
//         return <div key={permission.id}>
//           <h4>{permission.name}
//           </h4>
//           <p>{permission.role}</p>
//         </div>
//       })
//       }
//       {getCommunityBySlug.data?.members.map((member)=>{
//         return <div key={member.id}>
//           <h4>{member.name}
//           </h4>
//           <p>{member.points}</p>
//           <img  src={member.image as string} alt={member.name as string} />
//           {/* <p>{member.email}</p> */}
//         </div>
//       })
//       }
//       <form onSubmit={handleSubmit((data)=>{
//         sendMessageToCommunity.mutate({
//           communityId:getCommunityBySlug.data?.id as string,
//           text:data.text
//         },
//         {
//           onSuccess:()=>{
//             getCommunityMessages.refetch()
//             reset()
//           }
//         })
//       })}>
//         <input {...register("text")} type="text" />
//         <button type="submit">Send</button>
//       </form>
//       {getCommunityMessages.data?.map((message)=>{
//         return <div key={message.id}>
//           <h4>{message.sender.name}
//           </h4>
//           <p>{message.text}</p>
//           {/* <p>{message.sender.image}</p> */}
//           <img  src={message.sender.image as string} alt={message.sender.name as string} />
//       </div>
//       })}
//      </div>   
//   );
// }
// import router from 'next/router';
// import * as React from 'react';
// import { api } from '~/utils/api';
// import { useForm } from 'react-hook-form';
// export interface IAppProps {
// }
// //     getCommunityBySlug:publicProcedure
// //     .input(z.object({
// //         slug:z.string()
// //     }))
// //     .query(async ({ ctx:{prisma}, input:{slug} }) => {
// //         const community = await prisma.community.findUnique({
// //             where: {
// //                 slug: slug,
// //             },
// //             include :{
// //                 members:true,
// //                 permissions:true,
// //             }
// //         });
// //         return community;
// //     }),

// //     createCommunityMember: protectedProcedure
// //     .input(z.object({
// //         communityId:z.string(),
// //     }))
// //     .mutation(async ({ ctx:{prisma,session}, input:{communityId} }) => {
// //         const community = await prisma.community.findUnique({
// //             where: {
// //                 id: communityId,
// //             },
// //             include :{
// //                 members:true,
// //                 permissions:true,
// //             }
// //         });
// //         if(!community){
// //             throw new TRPCError({code:"NOT_FOUND",message:"Community not found"});
// //         }
// //         const member = await prisma.user.findUnique({
// //             where: {
// //                 id: session.user.id,
// //             },
// //             include :{
// //                 communities:true,
// //             }
// //         });
// //         if(!member){
// //             throw new TRPCError({code:"NOT_FOUND",message:"User not found"});
// //         }
// //         const isMember = member.communities.find((community)=>community.id === communityId);
// //         if(isMember){
// //             throw new TRPCError({
// //                 code : "PARSE_ERROR",
// //                 message:"User is already a member of this community"
// //             });
// //         }
// //         const newMember = await prisma.user.update({
// //             where: {
// //                 id: session.user.id,
// //             },
// //             data:{
// //                 communities:{
// //                     connect:{
// //                         id:communityId
// //                     }
// //                 }
// //             },
// //             include :{
// //                 communities:true,
// //             }
// //         });
// //         return newMember;
// //     }),
// //     deleteCommunityMember: protectedProcedure
// //     .input(z.object({
// //         communityId:z.string(),
// //     }))
// //     .mutation(async ({ ctx:{prisma,session}, input:{communityId} }) => {
// //         const community = await prisma.community.findUnique({
// //             where: {
// //                 id: communityId,
// //             },
// //             include :{
// //                 members:true,
// //                 permissions:true,
// //             }
// //         });
// //         if(!community){
// //             throw new TRPCError({code:"NOT_FOUND",message:"Community not found"});
// //         }
// //         const member = await prisma.user.findUnique({
// //             where: {
// //                 id: session.user.id,
// //             },
// //             include :{
// //                 communities:true,
// //             }
// //         });
// //         if(!member){
// //             throw new TRPCError({code:"NOT_FOUND",message:"User not found"});
// //         }
// //         const isMember = member.communities.find((community)=>community.id === communityId);
// //         if(!isMember){
// //             throw new TRPCError({
// //                 code : "PARSE_ERROR",
// //                 message:"User is not a member of this community"
// //             });
// //         }
// //         const newMember = await prisma.user.update({
// //             where: {
// //                 id: session.user.id,
// //             },
// //             data:{
// //                 communities:{
// //                     disconnect:{
// //                         id:communityId
// //                     }
// //                 }
// //             },
// //             include :{
// //                 communities:true,
// //             }
// //         });
// //         return newMember;
// //     }),
// // sendMessageToCommunity: protectedProcedure
// //     .input(z.object({
// //         communityId: z.string(),
// //         text: z.string(),
// //     }))
// //     .mutation(async ({input,ctx}) => {
// //         const {communityId,text} = input;
// //         const message = await ctx.prisma.message.create({
// //             data: {
// //                 text,
// //                 senderId: ctx.session.user.id,
// //                 communityId,
// //             }
// //         })
// //         return message;
// //     }),
// // getCommunityMessages: protectedProcedure
// // .input(z.object({
// //     communityId: z.string(),
// // }))
// // .query(async ({input,ctx}) => {
// //     const {communityId} = input;
// //     const messages = await ctx.prisma.message.findMany({
// //         where: {
// //             communityId,
// //         },
// //         orderBy: {
// //             createdAt: 'desc'
// //         },
// //         take: 20,
// //     })
// //     return messages;
// // }),
// export default function App (props: IAppProps) {

//   const getCommunityBySlug = api.community.getCommunityBySlug.useQuery({
//     slug: router.query.slug as string,
//   })

//   const createCommunityMember = api.community.createCommunityMember.useMutation()

//   const deleteCommunityMember = api.community.deleteCommunityMember.useMutation()

//   const sendMessageToCommunity = api.message.sendMessageToCommunity.useMutation()

//   const getCommunityMessages = api.message.getCommunityMessages.useQuery({
//     communityId:getCommunityBySlug.data?.id as string
//   })

//   const {register,handleSubmit,reset} = useForm()

//   return (
//     <div>
//       <h1>Community</h1>
//       <h2>{getCommunityBySlug.data?.name}</h2>
//       <h3>{getCommunityBySlug.data?.description}</h3>
//       <h3>{getCommunityBySlug.data?.members.length}</h3>
//       <button onClick={()=>{
//         createCommunityMember.mutate({
//           communityId:getCommunityBySlug.data?.id as string
//         },
//         {
//           onSuccess:()=>getCommunityBySlug.refetch()
//         })
//       }}>Join</button>
//       <button onClick={()=>{
//         deleteCommunityMember.mutate({
//           communityId:getCommunityBySlug.data?.id as string
//         },
//         {
//           onSuccess:()=>{
//             getCommunityBySlug.refetch()
//             router.push("/community")
//           }
//         }
        
        
//         )
//       }}>Leave</button>

//       {getCommunityBySlug.data?.permissions.map((permission)=>{
//         return <div key={permission.id}>
//           <h4>{permission.name}
//           </h4>
//           <p>{permission.role}</p>
//         </div>
//       })
//       }
//       {getCommunityBySlug.data?.members.map((member)=>{
//         return <div key={member.id}>
//           <h4>{member.name}
//           </h4>
//           <p>{member.points}</p>
//           <img  src={member.image as string} alt={member.name as string} />
//           {/* <p>{member.email}</p> */}
//         </div>
//       })
//       }
//       <form onSubmit={handleSubmit((data)=>{
//         sendMessageToCommunity.mutate({
//           communityId:getCommunityBySlug.data?.id as string,
//           text:data.text
//         },
//         {
//           onSuccess:()=>{
//             getCommunityMessages.refetch()
//             reset()
//           }
//         })
//       })}>
//         <input {...register("text")} type="text" />
//         <button type="submit">Send</button>
//       </form>
//       {getCommunityMessages.data?.map((message)=>{
//         return <div key={message.id}>
//           <h4>{message.sender.name}
//           </h4>
//           <p>{message.text}</p>
//           {/* <p>{message.sender.image}</p> */}
//           <img  src={message.sender.image as string} alt={message.sender.name as string} />
//       </div>
//       })}








//      </div>   
//   );
// }
