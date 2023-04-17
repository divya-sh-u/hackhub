import * as React from 'react';
import asdffads from '~/assets/Mobile development-amico.svg'
import Image from 'next/image';
import dynamic from 'next/dynamic';
export interface ISecondPageProps {
}

function SecondPage (props: ISecondPageProps) {
  return (
    <div className='h-screen bg-black flex items-center justify-center'>
    <div className='grid grid-cols-12 gap-4 justify-between'>
      
    <div className='col-span-6 h-full flex flex-col justify-center pink-text-gradient'>
      <p className='text-4xl font-bold mr-10'>
                  <p>
                    Join us on  </p>
                  <p>This Exciting Journey </p>
                    
               </p>
        <p className='text-xl mr-10'>
          <p>Explore new Horizons</p>
          <p>And share our passion for </p>
          <p>Knowledge, creativity and Growth</p>
        </p>
      </div>
      <div className='col-span-6 h-full flex items-center justify-center ml-10'>
        <Image src={asdffads} alt="mobile" />
      </div>
      
    </div>
  </div>
  );
}

export default dynamic (() => Promise.resolve(SecondPage), {ssr: false})


  {/* <p>like-minded people</p> */}