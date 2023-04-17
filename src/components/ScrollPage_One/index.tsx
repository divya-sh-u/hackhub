import * as React from 'react';
import asdfasdasdf from '~/assets/Open source-bro.svg'
import Image from 'next/image';
import dynamic from 'next/dynamic';

export interface IFirstPageProps {
}

function FirstPage (props: IFirstPageProps) {
  return (
    <div className='h-screen bg-white flex items-center justify-center'>
           <div className='grid grid-cols-12 gap-4'>
             <div className='col-span-6 h-full flex items-center justify-center ml-10'>
    //           <Image src={asdfasdasdf} alt="opensource" />
             </div>
             <div className='col-span-6 h-full flex flex-col justify-center mr-20 green-text-gradient'>
               <p className='text-4xl font-bold  text-right mr-20'>
                <p>Build relationships with</p>
                <p>like-minded people</p>
                  
             </p>
             <p className='text-xl  text-right mr-20'>
             <p>Find a wealth of valuable insights</p>
        <p> Expert tips and inspiring projects</p>
        <p> On a wide range of topics.</p>
               </p>
             </div>
           </div>
         </div>
  );
}

export default ((dynamic(() => Promise.resolve(FirstPage), {ssr: false})))
   {/* <p
      className='text-4xl font-bold text-black text-right'
      > minded people</p> */}
      // function FirstPage(props: IFirstPageProps) {
      //   return (
      //     <div className='h-screen bg-white flex items-center justify-center'>
      //       <div className='grid grid-cols-12 gap-4'>
      //         <div className='col-span-6 h-full flex items-center justify-center'>
      //           <Image src={asdfasdasdf} alt="opensource" />
      //         </div>
      //         <div className='col-span-6 h-full flex flex-col justify-center'>
      //           <p className='text-4xl font-bold text-black'>
      //             Build relationships with like-minded people
      //           </p>
      //           <p className='text-2xl text-black'>
      //             Discover meaningful discussions, engage in interactive projects, and build your own community...
      //           </p>
      //         </div>
      //       </div>
      //     </div>
      //   );
      // }
      