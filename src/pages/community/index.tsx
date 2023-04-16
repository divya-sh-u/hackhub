import * as React from 'react';
import { LayoutWithSideBar } from '~/Layout/LayoutWithSidebar';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { api } from '~/utils/api';

export interface IAppProps {
}

export default function App (props: IAppProps) {
    const getAllCommunities = api.community.getAllCommunities.useQuery()

  const createCommunity = api.community.createCommunity.useMutation({
    onSuccess: () => {
      console.log('succesufully created community')
    },
    onError: (error) => {
      toast.error(error.message as string)
    }
  })

  const { register, handleSubmit } = useForm();

  const [showCommunityForm, setShowCommunityForm] = React.useState(false)

  return (
    <LayoutWithSideBar>
           <div 
           className='max-w-3xl justify-center mx-auto m-2 space-y-4'>
       {showCommunityForm ? <button 
       className='top-15 right-5 fixed rounded-lg bg-white border-gray-200 py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700'
       onClick={() => setShowCommunityForm(false)}>Cancel</button> : <button 
       className='top-15 right-5 fixed rounded-lg bg-white border-gray-200 py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700'
       onClick={() => setShowCommunityForm(true)}>Create Community</button>}
       {showCommunityForm &&
       <form 
       className='mt-8 grid lg:grid-cols-1 gap-4 space-y-3 mb-10'
       onSubmit={(handleSubmit((data) => {
        createCommunity.mutate(
          {
            name: data.name,
            description: data.description
          }
        )
        
        }))
      }>
        <input type="text" 
        className='bg-gray-200 border border-gray-200 rounded py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
        placeholder="name" {...register('name')} />
        <input type="text" 
        className='bg-gray-200 border border-gray-200 rounded py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full'
        placeholder="description" {...register('description')} />
        <button 
        className='btn btn-block btn-primary justify-center'
        type="submit">Submit</button>
      </form>}
      <div>
      <h1
      className='text-3xl font-bold text-center mb-10'
      >Community</h1>
        {getAllCommunities.data?.map((community) => {
          return (
            <div key={community.id} className="bg-white rounded-lg shadow-md overflow-hidden mb-10">
        <Link
        href={`/community/${community.slug}`}
        className="block">
          <div className="p-5 py-8 mt-5 space-y-4 mb-5">
            <h1 className="text-xl font-semibold mb-2 text-gray-900">{community.name}</h1>
            <p className="text-gray-800 text-sm mb-4">{community.description}</p>
            <div className="mt-5">
              {community.members.map((member) => (
                <div key={member.id} className="flex items-center">
                  <p className="text-gray-700 font-semibold">{member.name}</p>
                  {/* <p className="text-gray-500 text-sm ml-2">{member.email}</p> */}
                </div>
              ))}
              {getAllCommunities.data?.map((permission) => {
                return(
                  <div key={permission.id}>
                    <p>{permission.permissions.map((permission) => {
                      return (
                        <div key={permission.id}>
                         <p>{permission.role}</p>
                        </div>
                      )
                    })}
                </p>
                  </div>
                )})}
            </div>
          </div>
        </Link>
    </div>)})}
              
      </div>
    </div>
    </LayoutWithSideBar>
  );
}


   {/* <p>{community.permissions.map((permission) => {
                return (
                  <div key={permission.id}>
                    <p>{permission.role}</p>
                  </div>
                )
              })}</p> */}
              {/* <button 
      className=' top-15 right-5 fixed rounded-lg bg-white border-gray-200 py-2 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700'
      onClick={() => getAllCommunities.refetch()}>See All Communities</button> */}
// import * as React from 'react';
// import { api } from '~/utils/api';
// import { useForm } from 'react-hook-form';
// import { toast } from 'react-hot-toast';
// import Link from 'next/link';
// export interface IAppProps {
// }
// // createCommunity: protectedProcedure
// //     .input(z.object({
// //         name:z.string().min(1).max(50),
// //         description:z.string().min(10).max(100),
// //     }))
// //     .mutation(async ({ ctx:{prisma,session}, input:{name,description} }) => {
// //         const slug = slugify(name, { lower: true });
// //         const community = await prisma.community.create({
// //             data:{
// //                 name,
// //                 description,
// //                 slug,
// //                 members:{
// //                     connect:{
// //                         id:session.user.id
// //                     }
// //                 },
// //                 permissions:{
// //                     create:{
// //                         role:"ADMIN"
// //                     }
// //                 }
// //             }
// //         });
// //         return community;
// //     }),

// //     getAllCommunities:publicProcedure
// //     .query(async ({ ctx:{prisma} }) => {
// //         const communities = await prisma.community.findMany({
// //             include :{
// //                 members:true,
// //                 permissions:true,
// //             }
// //         });
// //         return communities;
// //     }),



// export default function App () {

 



//   const getAllCommunities = api.community.getAllCommunities.useQuery()

//   const createCommunity = api.community.createCommunity.useMutation({
//     onSuccess: () => {
//       console.log('succesufully created community')
//     }
//   })

//   const { register, handleSubmit } = useForm();

//   return (
//     <div>
//       <h1>Community</h1>
//       <form onSubmit={(handleSubmit((data) => {
//         createCommunity.mutate(
//           {
//             name: data.name,
//             description: data.description
//           }
//         )
        
//         }))
//       }>
//         <input type="text" placeholder="name" {...register('name')} />
//         <input type="text" placeholder="description" {...register('description')} />
//         <button type="submit">Create Community</button>
//       </form>
//       <button onClick={() => getAllCommunities.refetch()}>Get All Communities</button>
//       <div>
//         {getAllCommunities.data?.map((community) => {
//           return (
//             <div key={community.id}>
//               <Link  href={`/community/${community.slug}`}>
//               <h1>{community.name}</h1>
//               <p>{community.description}</p>
//               </Link>
//               <p>{community.slug}</p>
//               <p>{community.members.map((member) => {
//                 return (
//                   <div key={member.id}>
//                     <p>{member.name}</p>
//                     {/* <p>{member.email}</p> */}
//                   </div>
//                 )
//               })}</p>
//               <p>{community.permissions.map((permission) => {
//                 return (
//                   <div key={permission.id}>
//                     <p>{permission.role}</p>
//                   </div>
//                 )
//               })}</p>
//             </div>
//           )
//         })}
//       </div>

//     </div>
//   );
// }

        
        
// //         )}>



// //     </div>
// //   );
// // }
