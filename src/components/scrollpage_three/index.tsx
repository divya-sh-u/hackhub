import * as React from 'react';
// import { interaction } from '~/pages';
import asdf from '~/assets/Interaction Design-pana.svg'
import Image from 'next/image';
import dynamic from 'next/dynamic';

export interface IThirdPageProps {
}

function ThirdPage (props: IThirdPageProps) {
  return (
    <div className='h-screen bg-white flex items-center justify-center'>
  <div className='grid grid-cols-12 gap-4'>
    <div className='col-span-6 h-full flex items-center justify-center'>
      <Image src={asdf} alt="interaction" />
    </div>
    <div className='col-span-6 h-full orange-text-gradient flex flex-col justify-center '>
    <p className='text-4xl font-bold text-right ml-20 '>
                <p>Interact With Other Creators</p>
                {/* <p>like-minded people</p> */}
                  
             </p>
      <p className='text-xl text-right '>
        <p>Join the community and find</p>
        <p> like minded people to collaborate</p>
        <p> with and build your own community</p>
      </p>
    </div>
  </div>
</div>
  );
}
export default dynamic(() => Promise.resolve(ThirdPage), {ssr: false})
{/* <div className='h-screen bg-white flex items-center justify-center'>
           <div className='grid grid-cols-12 gap-4'>
             <div className='col-span-6 h-full flex items-center justify-center'>
    //           <Image src={asdfasdasdf} alt="opensource" />
             </div>
             <div className='col-span-6 h-full flex flex-col justify-center mr-20'>
               <p className='text-4xl font-bold text-black text-right '>
                <p>Build relationships with</p>
                <p>like-minded people</p>
                  
             </p>
             <p className='text-xl text-black text-right'>
             <p>Join the community and find</p>
        <p> like minded people to collaborate</p>
        <p> with and build your own community</p>
               </p>
             </div>
           </div>
         </div> */}