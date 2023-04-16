import * as React from 'react';
import { LayoutWithSideBar } from '~/Layout/LayoutWithSidebar';
import {MyModal} from '~/components/formModal';
import { api } from '~/utils/api';
import Image from 'next/image';
import { useRouter } from 'next/router';

export interface IAppProps {
}


// if (!getPostsOnTheBasisOfLikes) {
//   // handle null value
  
//   alert('null value');
  
// }

// )
export default function App () {

  const router = useRouter();
  const getPostsOnTheBasisOfLikes = api.post.getPostsOnTheBasisOfLikes.useQuery(
    { limit: 10, skip: 0 },
   {
     onSuccess: () => {
       console.log('succssfully fetched posts');
     }, 
   }
  );
  const getAll = api.post.getAll.useQuery()
  return (
    <LayoutWithSideBar>


            <MyModal/>
           {/* asdf asf asdf asdf asdf */}
           {/* {getPostsOnTheBasisOfLikes?.data ??  getPostsOnTheBasisOfLikes?.data.map((post) => (  
          ))\

      } */}
      <div className=' grid-cols-1 lg:grid-cols-3 grid ml-10'>
        {getPostsOnTheBasisOfLikes.data?.map((post) => (
       
          // <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="h-96 w-96 mt-20 border-1 border-black">
            <div className='col-span-1 lg:col-span-3'>
              <a href={`blogs/${post.slug}`}>
                  <Image className="rounded-t-lg" width={300} height={200} src={post.featuredImage as string} alt="asdf asdf "/>
              </a>
              <div className="p-5">
                  <a href="#">
                      <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">{post.title}</h5>
                  </a>
                  <p className="font-normal text-gray-700 mb-3  text-clip  truncate">{post.description}</p>
                  <a className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center" href="#">
                      Read more
                  </a>
              </div>
              </div>
          {/* </div> */}
          {/* <p>{post.text}<a className="text-blue-600 hover:underline" href="#" target="_blank">Flowbite Documentation</a>.</p> */}
      </div>
    
        ))}
        </div>
            



    </LayoutWithSideBar>
  );
}

      {/* <div > */}
        {/* <div classNameName='flex flex-col'> */}
         {/* </div> */}
        {/* </div> */}
          {/* </> */}
             // <>