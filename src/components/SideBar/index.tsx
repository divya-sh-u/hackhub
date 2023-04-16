import * as React from 'react';
import {AiOutlineMenuUnfold} from 'react-icons/ai'
import Link from 'next/link';
export interface ISideBarProps {
}

export default function SideBar (props: ISideBarProps) {
  return (
    
    
    <aside className="col-span-4 flex-col space-y-8 p-6 my-6 gap-y-5 hidden md:flex w-80 border-r-2 border-gray-400">
      {/* <!-- Sidebar content here --> */}
      <div className='drawer-side'>
        <div className=' menu border-rounded rounded-full'>
      <ul>
        <li><Link href='/points_table'>
          Points Table
          </Link></li>
      <li><Link href='/community'>Community</Link></li>
      <li ><Link href='/blogs'>Blogs</Link></li>
      {/* <li><a href='/builders'>Builders</a></li> */}
      <li><Link href='/projects'>Projects</Link></li>
    </ul>
    </div>
    </div>
    
  </aside>
    
  );
}
// <div>
{/* // </div> */}
 {/* <div className="drawer-side"> */}
    {/* <label htmlFor="my-drawer-2" className="drawer-overlay"></label>  */}
    {/* </div> */}