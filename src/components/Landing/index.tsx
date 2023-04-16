import * as React from 'react';
import dynamic from 'next/dynamic';
import coolKid  from '~/assets/Pull request-amico.svg'
import Image from 'next/image';
export interface ILandingProps {
}

 function Landing (props: ILandingProps) {
  return (
    <div>
     <div className="h-screen bg-black flex flex-col items-center justify-center">
      {/* <img className="w-64 h-64" src={coolKid} alt='coolKid' /> */}
      <Image src={coolKid} alt="opensource" />
      <h1 className="text-4xl font-bold text-gray-100 mt-8 blue-text-gradient">
        Meet The largest Community of Developers.
      </h1>
    </div>
    </div>

    // </div>
  );
}
export default dynamic (() => Promise.resolve(Landing), {ssr: false})