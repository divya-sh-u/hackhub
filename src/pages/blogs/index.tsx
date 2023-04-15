import * as React from 'react';
import { LayoutWithSideBar } from '~/Layout/LayoutWithSidebar';
export interface IAppProps {
}

export default function App (props: IAppProps) {
  return (
    <LayoutWithSideBar>
      <div className='max-w-2xl justify-right mx-auto'>
        <div className='flex flex-col'>

            asdfsadf asdf asdf alore Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed ipsum suscipit laborum fuga enim aut harum esse cumque, aspernatur voluptates neque repudiandae porro dolores itaque culpa temporibus. Ipsum, numquam atque.
            </div>
        </div>
    </LayoutWithSideBar>
  );
}

