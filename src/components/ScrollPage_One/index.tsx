import * as React from 'react';
import asdfasdasdf from '~/assets/Open source-bro.svg'
import Image from 'next/image';
export interface IFirstPageProps {
}

export default function FirstPage (props: IFirstPageProps) {
  return (
    <div className='h-screen bg-white'>
      <div className='grid grid-cols-12 place-items-center'>
    <div className='col-span-6 h-full'>
      <Image src={asdfasdasdf} alt="opensource"/>
    </div>
    <div className='col-span-6  h-full mt-20 pt-20 items-center text-right flex flex-col  mr-15 pr-20'>
      <p className='text-4xl font-bold text-black'>
      <p
      >Build relationships with like</p><p
      >minded people</p>
      </p >
      {/* <p
      className='text-4xl font-bold text-black text-right'
      > minded people</p> */}
      <p className='text-2xl text-black'>
        <p>Discover meaningful discussions , engage</p>
        <p> In interactive Projects and Build</p>
      <p> Your Own Community...</p>
      </p>
    </div>
  </div>
    </div>
  );
}
