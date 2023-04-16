import * as React from 'react';
import asdffads from '~/assets/Mobile development-amico.svg'
import Image from 'next/image';
import dynamic from 'next/dynamic';
export interface ISecondPageProps {
}

function SecondPage (props: ISecondPageProps) {
  return (
    <div className='bg-black h-screen'>
      <div className='grid grid-cols-12 place-items-center'>
      <div className='col-span-6 h-full justify-center items-center flex flex-col'>
        <p>
        Find a wealth of valuable insights, export tips and projects
        </p>
        <p>to help you grow your skills and knowledge.</p>
      <p className='text-2xl text-white'>
        <p>creativity and growth.</p>
        <p>
        On this exciting journey, as we explore new horizons
        </p>
        <p>and share our passion for knowledge,</p>
        </p>
    </div>
    <div className='col-span-6 h-full'>
      <Image src={asdffads} alt="mobile" />
    </div>
    
  </div>
    </div>
  );
}

export default dynamic (() => Promise.resolve(SecondPage), {ssr: false})