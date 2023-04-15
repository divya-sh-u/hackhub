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
    <div className='col-span-6 h-full justify-center items-center flex flex-col'>
      <h1 className='text-4xl font-bold text-black'>Interact with other hackers</h1>
      <p className='text-2xl text-black'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, quae.</p>
    </div>
  </div>
</div>
  );
}
