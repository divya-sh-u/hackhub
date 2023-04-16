import * as React from 'react';
// import { interaction } from '~/pages';
import asdf from '~/assets/Interaction Design-pana.svg'
import Image from 'next/image';

export interface IThirdPageProps {
}

export default function ThirdPage (props: IThirdPageProps) {
  return (
    <div className='bg-white h-screen'>
  <div className='grid grid-cols-12 place-items-center'>
    <div className='col-span-6 h-full'>
      <Image src={asdf} alt="interaction" />
    </div>
    <div className='col-span-6 h-full justify-center items-center flex flex-col ml-20'>
      <h1 className='text-4xl font-bold text-black'>Interact with other hackers</h1>
      <p className='text-2xl text-black text-right'>
        <p>Join the community and find</p>
        <p> like minded people to collaborate</p>
        <p> with and build your own community</p>
      </p>
    </div>
  </div>
</div>
  );
}
