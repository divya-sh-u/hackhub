import * as React from 'react';
import { LayoutWithSideBar } from '~/Layout/LayoutWithSidebar';
import { api } from '~/utils/api';
import { useSession,getSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import toast from 'react-hot-toast';

export interface IAppProps {
}

export default function App (props: IAppProps) {
     const [users, setUsers] = React.useState([]);
  const [updatedYourPoints, setUpdatedYourPoints] = useState(true)
  const router = useRouter()
  // const {data:session}= useSession();
  // async function getSession() {
    // const session = await getSession();
    // // if (!session) {
    //   // router.push('/login');
    // }/

    const session = api.auth.getSession.useQuery()

    // getSession();
  const updateUserPointsOnTheBasisOfNumberOfProjectsAndNumberOfBlogsAndNumberOfFollowers =
  api.user.updateUserPointsOnTheBasisOfNumberOfProjectsAndNumberOfBlogsAndNumberOfFollowers.useMutation({

  })

  
  const getUsersPointsTable = api.user.getUsersPointsTable.useQuery()
  return (
    <LayoutWithSideBar>
      {/* <div className='max-w-3xl justify-right mx-auto'> */}
        {/* <div className='flex flex-col'> */}
            {updatedYourPoints && <>
     <div>
     <div className="px-4 sm:px-6 lg:px-8">
       <div className="sm:flex sm:items-center">
         <div className="sm:flex-auto">
           <h1 className="text-xl font-semibold text-gray-900">Builders</h1>
           <p className="mt-4 text-lg text-gray-200">
             A list of all the builders in the community According to their points 🫵...
           </p>
         </div>
         <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        
         <button 
         className="btn btn-primary top-15 right-5 fixed"
         onClick={() => {updateUserPointsOnTheBasisOfNumberOfProjectsAndNumberOfBlogsAndNumberOfFollowers.mutate(
       {
         userId: session.data?.user.id as string,
       },
       {
         onSuccess() {
           setUpdatedYourPoints(true)
          //  console.log('success')
          toast.success('Your Points Updated Successfully');
         },
          onError(error) {
            toast.error(error.message as string);
       }
       }
       
       )}}>Update Your Points 
     </button>
         </div>
       </div>
       <div className="mt-8 flex flex-col min-w-full">
         <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
           <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
             <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
               <table className="min-w-full mt-20  divide-y divide-gray-300">
                 <thead className="bg-gray-50">
                   <tr>
                     <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                       Name
                     </th>
                     <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Points
                     </th>
                     {/* <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      
                     </th> */}
                     <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Followers
                     </th>
                     {/* <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                       <span className="sr-only">Edit</span>
                     </th> */}
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-200 bg-white">
                   {getUsersPointsTable.data?.map((person) => (
                     <tr key={person.id}>
                       <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                         <div className="flex items-center">
                           <Link href={`/profile/${person.id}`}> 
                           <div className="h-10 w-10 flex-shrink-0">
                             <img className="h-10 w-10 rounded-full" src={person.image as string} alt="" />
                           </div>
                           <div className="ml-4">
                             <div className="font-medium text-gray-900">{person.name}</div>
                           </div>
                           </Link>
                         </div>
                       </td>
                       <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                       <div className="text-gray-500">{person.points}</div>
                       </td>
                       {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                         <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                           Active
                         </span>
                       </td> */}
                       <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{person.followedBy.length}</td>
                       {/* <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                         <a href="#" className="text-indigo-600 hover:text-indigo-900">
                           Edit<span className="sr-only">, {person.name}</span>
                         </a>
                       </td> */}
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </div>
         </div>
       </div>
     </div>
     </div>  
     </>      
     } 
            {/* </div> */}
        {/* </div> */}
    </LayoutWithSideBar>
  );
}
//  import * as React from 'react';
//  import Link from 'next/link';
//  import {api} from '~/utils/api';
//  import { useSession } from 'next-auth/react';
//  import { useState } from 'react';
//  import { useRouter } from 'next/router';
//  export interface IAppProps {
//  }

//  export default function App (props: IAppProps) {



  
  
//   return(
//      <>
//      {updatedYourPoints && <>
//      <div>
//      <div className="px-4 sm:px-6 lg:px-8">
//        <div className="sm:flex sm:items-center">
//          <div className="sm:flex-auto">
//            <h1 className="text-xl font-semibold text-gray-900">Builders</h1>
//            <p className="mt-2 text-sm text-gray-700">
//              A list of all the users in your account including their name, title, email and role.
//            </p>
//          </div>
//          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        
//          <button 
//          className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
//          onClick={() => {updateUserPointsOnTheBasisOfNumberOfProjectsAndNumberOfBlogsAndNumberOfFollowers.mutate(
//        {
//          userId: session?.user.id as string,
//        },
//        {
//          onSuccess() {
//            setUpdatedYourPoints(true)
//            console.log('success')
//          },
//        }
      
      
//        )}}>Update Your Points On The Basis Of Number Of Projects And Number Of Blogs And Number Of Followers
//      </button>
//          </div>
//        </div>
//        <div className="mt-8 flex flex-col">
//          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
//            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
//              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
//                <table className="min-w-full divide-y divide-gray-300">
//                  <thead className="bg-gray-50">
//                    <tr>
//                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
//                        Name
//                      </th>
//                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
//                      Number Of Points
//                      </th>
//                      {/* <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      
//                      </th> */}
//                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
//                        Numbers Of Followers
//                      </th>
//                      {/* <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
//                        <span className="sr-only">Edit</span>
//                      </th> */}
//                    </tr>
//                  </thead>
//                  <tbody className="divide-y divide-gray-200 bg-white">
//                    {getUsersPointsTable.data?.map((person) => (
//                      <tr key={person.id}>
//                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
//                          <div className="flex items-center">
//                            <Link href={`/profile/${person.id}`}> 
//                            <div className="h-10 w-10 flex-shrink-0">
//                              <img className="h-10 w-10 rounded-full" src={person.image as string} alt="" />
//                            </div>
//                            <div className="ml-4">
//                              <div className="font-medium text-gray-900">{person.name}</div>
//                            </div>
//                            </Link>
//                          </div>
//                        </td>
//                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                        <div className="text-gray-500">{person.points}</div>
//                        </td>
//                        {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
//                            Active
//                          </span>
//                        </td> */}
//                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.followedBy.length}</td>
//                        {/* <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
//                          <a href="#" className="text-indigo-600 hover:text-indigo-900">
//                            Edit<span className="sr-only">, {person.name}</span>
//                          </a>
//                        </td> */}
//                      </tr>
//                    ))}
//                  </tbody>
//                </table>
//              </div>
//            </div>
//          </div>
//        </div>
//      </div>
//      </div>  
//      </>      
//      }
//      </>
//   ) 
//  }