import * as React from 'react';
import asdffads from '~/assets/Mobile development-amico.svg'
import Image from 'next/image';
export interface ISecondPageProps {
}

export default function SecondPage (props: ISecondPageProps) {
  return (
    <div className='bg-black h-screen'>
      <div className='grid grid-cols-12 place-items-center'>
      <div className='col-span-6 h-full justify-center items-center flex flex-col'>
      <h1 className='text-4xl font-bold text-white'>Interact with other hackers</h1>
      <p className='text-2xl text-white'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, quae.</p>
    </div>
    <div className='col-span-6 h-full'>
      <Image src={asdffads} alt="mobile" />
    </div>
    
  </div>
    </div>
  );
}
