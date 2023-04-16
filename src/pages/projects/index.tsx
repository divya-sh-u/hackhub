import * as React from 'react';
import { LayoutWithSideBar } from '~/Layout/LayoutWithSidebar';
import { api } from '~/utils/api';
import { FcLike,FcLikePlaceholder } from 'react-icons/fc';
import Link from 'next/link';
import Image from 'next/image';
export interface IAppProps {
}

export default function App (props: IAppProps) {

  // const [isLiked, setIsLiked] = React.useState(false);


 

  const showableProjectsSortedOnTheBasisOfLikes= 
  api.projects.showableProjectsSortedOnTheBasisOfLikes.useQuery();


  // const getLikesOnProjects= api.projects.getLikesOnProject.useQuery({
  //   projectId: showableProjectsSortedOnTheBasisOfLikes.data?.id,
  // });

  return (
    <LayoutWithSideBar>
      {/* <div className='max-w-3xl justify-right mx-auto'> */}
        {/* <div className='flex flex-col'> */}

        <div className = 'top-10 right-5 mt-4 fixed bg-transparent border-gray-300 border-b-2'>
          <Link
          href={'projects/new'}
          >
          Create Project
          </Link>
          </div>

        {showableProjectsSortedOnTheBasisOfLikes.isSuccess && (
        <div className='mt-20'>
          {showableProjectsSortedOnTheBasisOfLikes.data.map((project) => (
            <button
            className="p-8 border border-gray-200 rounded bg-transparent w-64 hover:bg-gray-600 hover:border-b-4 hover:border-b-blue-500 active:bg-gray-100">
            <div key={project.id}>
              <Link className='cursor-pointer' href={`/projects/${project.id}`}>
              <div>{project.title}</div>
              
              <Image 
              width={300}
              height={200}
              src={project.snapshot as string} alt={project.title} >
              </Image>
              <div
              className=' overflow-hidden truncate'
              >{project.description}</div>
              {/* <div>{project.}</div> */}
              <div >
              
              <div className='items-center flex gap-2 flex-col'>
  {project.likes.length>0  ? (
    <div className='ml-auto flex gap-2 flex-col items-end'>
      <FcLike  />
      <div className='pr-1'>
      {project.likes.length}
      </div>
    </div>
  ) : (
    <div className='ml-auto flex gap-2 flex-col items-end '>
      <FcLikePlaceholder   />
      <div className='pr-1'>
      {project.likes.length}
      </div>
    </div>
  )}
</div>
              </div></Link>
            </div> </button>
          ))
         
          }
        </div>
      )
      }
            {/* </div> */}
        {/* </div> */}
    </LayoutWithSideBar>
  );
}
{/* <button
  class="p-8 border border-gray-200 rounded bg-white w-64 hover:bg-gray-50 hover:border-b-4 hover:border-b-blue-500 active:bg-gray-100"
>
  <div class="flex justify-center items-center text-gray-500">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-24 w-24"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  </div>
  <div class="text-center mt-4">
    <h1 class="font-bold text-gray-700 text">Content page</h1>
    <p class="text-500 text-sm mt-4">
      Build a page using page fragments and edit content inline
    </p>
  </div>
</button> */}