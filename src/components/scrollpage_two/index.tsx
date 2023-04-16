import * as React from 'react';
import asdffads from '~/assets/Mobile development-amico.svg'
import Image from 'next/image';
import dynamic from 'next/dynamic';
export interface ISecondPageProps {
}

function SecondPage (props: ISecondPageProps) {
  return (
    <div className='h-screen bg-black flex items-center justify-center'>
    <div className='grid grid-cols-12 gap-4'>
      
    <div className='col-span-6 h-full flex flex-col justify-center pink-text-gradient'>
      <p className='text-4xl font-bold  ml-20 '>
                  <p>Find a wealth of valuable insights, </p>
                  <p>export tips and projects ..</p>
                    
               </p>
        <p className='text-xl  ml-20'>
          <p>Join the community and find</p>
          <p> like minded people to collaborate</p>
          <p> with and build your own community</p>
        </p>
      </div>
      <div className='col-span-6 h-full flex items-center justify-center'>
        <Image src={asdffads} alt="mobile" />
      </div>
      
    </div>
  </div>
  );
}

export default dynamic (() => Promise.resolve(SecondPage), {ssr: false})


  {/* <p>like-minded people</p> */}