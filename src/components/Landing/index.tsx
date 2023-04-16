import * as React from 'react';
import dynamic from 'next/dynamic';
export interface ILandingProps {
}

 function Landing (props: ILandingProps) {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black">
    <div className="flex flex-col items-center justify-center gap-4">
        hello world
    </div>
    </div>
    </div>
  );
}
export default dynamic (() => Promise.resolve(Landing), {ssr: false})