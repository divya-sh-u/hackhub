import * as React from 'react';
import {AiOutlineMenuUnfold} from 'react-icons/ai'
export interface ISideBarProps {
}

export default function SideBar (props: ISideBarProps) {
  return (
    <div>
     <div className="drawer-side ">
    <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 bg-base-100 text-base-content border-r-2">
      {/* <!-- Sidebar content here --> */}
      <li><a>Points Table </a></li>
      <li><a>Community</a></li>
      <li><a>Blogs</a></li>
      <li><a>Builders</a></li>
    </ul>
  
  </div>
    </div>
  );
}
