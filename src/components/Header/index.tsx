import { signIn, useSession } from "next-auth/react";
import { FC } from "react";
import { BiUser} from 'react-icons/bi';
// import { Theme,useTheme } from "~/utils/themeContext";
import { useTheme } from "next-themes";
// import {hackhub} from '~/assets/Hack hub (1).svg'
// hackhub\src\assets\Hack hub (1).svg
import { FaSun, FaMoon } from 'react-icons/fa'
interface HeaderProps{
  children?: React.ReactNode;
}

export const Header: FC<HeaderProps> = () => {



    const {theme,setTheme} = useTheme();

    // const toggleTheme = () => {
    //   if(theme === Theme.Light){
    //       setTheme(Theme.Dark)
    //   }else{
    //       setTheme(Theme.Light)
    //   }


    const {data:session}= useSession();
    return <>  
    <div className="navbar bg-black">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>Blogs</a></li>
        <li tabIndex={0}>
          <a className="justify-between">
            Community
            {/* <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg> */}
          </a>
          {/* <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul> */}
        </li>
        <li><a>Builders</a></li>
      </ul>
    </div>
    <div className="flex flex-col ">
    {/* <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={20} zoomAndPan="magnify" viewBox="0 0 375 374.999991" height="500" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><g/></defs><g fill="#49d3ff" fill-opacity="1"><g transform="translate(15.683593, 332.3365)"><g><path d="M 29.652344 -58.804688 L 29.652344 -35.449219 L 17.136719 -35.449219 L 17.136719 -58.804688 L 2.941406 -58.804688 L 2.941406 0 L 17.136719 0 L 17.136719 -21.167969 L 29.652344 -21.167969 L 29.652344 0 L 35.03125 0 C 39.902344 0 43.851562 -3.949219 43.851562 -8.820312 L 43.851562 -58.804688 Z M 29.652344 -58.804688 "/></g></g></g><g fill="#49d3ff" fill-opacity="1"><g transform="translate(62.374771, 332.3365)"><g><path d="M 29.652344 -58.804688 L 2.941406 -58.804688 L 2.941406 0 L 17.136719 0 L 17.136719 -21.335938 L 29.652344 -21.335938 L 29.652344 0 L 43.851562 0 L 43.851562 -44.523438 C 43.851562 -52.417969 37.464844 -58.804688 29.652344 -58.804688 Z M 17.136719 -35.617188 L 17.136719 -44.523438 L 29.652344 -44.523438 L 29.652344 -35.617188 Z M 17.136719 -35.617188 "/></g></g></g><g fill="#49d3ff" fill-opacity="1"><g transform="translate(108.89798, 332.3365)"><g><path d="M 37.550781 -44.523438 L 37.550781 -58.804688 L 16.464844 -58.804688 C 8.570312 -58.804688 2.269531 -52.417969 2.269531 -44.523438 L 2.269531 -14.195312 C 2.269531 -6.300781 8.570312 0 16.464844 0 L 37.550781 0 L 37.550781 -14.195312 L 16.464844 -14.195312 L 16.464844 -44.523438 Z M 37.550781 -44.523438 "/></g></g></g><g fill="#49d3ff" fill-opacity="1"><g transform="translate(147.695326, 332.3365)"><g><path d="M 49.816406 -58.550781 L 40.742188 -58.636719 L 29.820312 -58.636719 L 16.96875 -43.597656 L 16.96875 -58.71875 L 2.773438 -58.71875 L 2.773438 0.0859375 L 16.96875 0.0859375 L 16.96875 -18.480469 L 23.015625 -9.410156 C 27.972656 -3.277344 34.777344 0.167969 41.75 0.0859375 L 49.5625 0 L 26.378906 -32.761719 Z M 49.816406 -58.550781 "/></g></g></g><g fill="#49d3ff" fill-opacity="1"><g transform="translate(194.974348, 332.3365)"><g/></g></g><g fill="#49d3ff" fill-opacity="1"><g transform="translate(221.259118, 332.3365)"><g><path d="M 29.652344 -58.804688 L 29.652344 -35.449219 L 17.136719 -35.449219 L 17.136719 -58.804688 L 2.941406 -58.804688 L 2.941406 0 L 17.136719 0 L 17.136719 -21.167969 L 29.652344 -21.167969 L 29.652344 0 L 35.03125 0 C 39.902344 0 43.851562 -3.949219 43.851562 -8.820312 L 43.851562 -58.804688 Z M 29.652344 -58.804688 "/></g></g></g><g fill="#49d3ff" fill-opacity="1"><g transform="translate(267.950296, 332.3365)"><g><path d="M 29.316406 -58.804688 L 29.316406 -14.195312 L 16.800781 -14.195312 L 16.800781 -58.804688 L 2.605469 -58.804688 L 2.605469 -14.195312 C 2.605469 -6.300781 8.90625 0 16.800781 0 L 29.316406 0 C 37.128906 0 43.515625 -6.300781 43.515625 -14.195312 L 43.515625 -58.804688 Z M 29.316406 -58.804688 "/></g></g></g><g fill="#49d3ff" fill-opacity="1"><g transform="translate(314.137598, 332.3365)"><g><path d="M 39.230469 -31.839844 C 39.902344 -33.601562 40.324219 -35.449219 40.324219 -37.382812 L 40.324219 -44.523438 C 40.324219 -52.417969 33.9375 -58.804688 26.042969 -58.804688 L 2.941406 -58.804688 L 2.941406 0 L 29.652344 0 C 37.464844 0 43.851562 -6.300781 43.851562 -14.195312 L 43.851562 -21.335938 C 43.851562 -25.539062 42.085938 -29.234375 39.230469 -31.839844 Z M 17.136719 -44.523438 L 26.042969 -44.523438 L 26.042969 -35.617188 L 17.136719 -35.617188 Z M 17.136719 -14.195312 L 17.136719 -21.335938 L 29.652344 -21.335938 L 29.652344 -14.195312 Z M 17.136719 -14.195312 "/></g></g></g><path fill="#39a23a" d="M 261.144531 154.304688 C 261.582031 154.460938 262.027344 154.585938 262.480469 154.6875 C 262.933594 154.789062 263.390625 154.863281 263.851562 154.90625 C 264.3125 154.953125 264.777344 154.972656 265.242188 154.964844 C 265.707031 154.957031 266.167969 154.917969 266.625 154.855469 C 267.085938 154.792969 267.539062 154.703125 267.988281 154.582031 C 268.4375 154.464844 268.878906 154.320312 269.3125 154.152344 C 269.742188 153.980469 270.164062 153.789062 270.574219 153.566406 C 270.980469 153.347656 271.375 153.105469 271.753906 152.835938 C 272.136719 152.570312 272.5 152.28125 272.84375 151.972656 C 273.191406 151.660156 273.515625 151.332031 273.824219 150.984375 C 274.128906 150.636719 274.414062 150.269531 274.679688 149.886719 C 274.941406 149.503906 275.183594 149.105469 275.398438 148.695312 C 275.613281 148.285156 275.804688 147.863281 275.972656 147.429688 C 276.140625 146.996094 276.28125 146.550781 276.394531 146.101562 C 276.507812 145.652344 276.59375 145.195312 276.65625 144.734375 C 276.714844 144.273438 276.746094 143.8125 276.753906 143.347656 L 276.753906 120.363281 C 276.75 118.925781 276.640625 117.496094 276.421875 116.078125 C 276.199219 114.660156 275.875 113.265625 275.4375 111.898438 C 275.003906 110.53125 274.464844 109.203125 273.824219 107.917969 C 273.183594 106.632812 272.449219 105.40625 271.621094 104.234375 C 270.792969 103.0625 269.878906 101.960938 268.878906 100.929688 C 267.878906 99.898438 266.808594 98.953125 265.664062 98.089844 C 264.519531 97.222656 263.3125 96.453125 262.050781 95.773438 C 260.785156 95.097656 259.476562 94.519531 258.125 94.042969 L 113.976562 43.332031 C 113.535156 43.179688 113.085938 43.050781 112.632812 42.949219 C 112.175781 42.851562 111.714844 42.777344 111.25 42.730469 C 110.785156 42.683594 110.320312 42.667969 109.851562 42.675781 C 109.386719 42.6875 108.921875 42.722656 108.460938 42.789062 C 107.996094 42.855469 107.539062 42.949219 107.089844 43.066406 C 106.636719 43.1875 106.195312 43.332031 105.761719 43.507812 C 105.328125 43.679688 104.90625 43.878906 104.496094 44.101562 C 104.085938 44.324219 103.691406 44.570312 103.308594 44.84375 C 102.929688 45.113281 102.566406 45.40625 102.21875 45.71875 C 101.871094 46.035156 101.546875 46.367188 101.242188 46.722656 C 100.933594 47.074219 100.652344 47.445312 100.390625 47.832031 C 100.125 48.21875 99.890625 48.621094 99.675781 49.035156 C 99.460938 49.449219 99.273438 49.878906 99.109375 50.316406 C 98.945312 50.753906 98.808594 51.199219 98.699219 51.65625 C 98.589844 52.109375 98.503906 52.570312 98.449219 53.03125 C 98.394531 53.496094 98.367188 53.964844 98.367188 54.429688 L 98.367188 84.90625 C 98.363281 85.796875 98.425781 86.6875 98.558594 87.570312 C 98.691406 88.453125 98.890625 89.320312 99.15625 90.171875 C 99.425781 91.023438 99.757812 91.851562 100.152344 92.652344 C 100.550781 93.453125 101.003906 94.214844 101.519531 94.945312 C 102.035156 95.675781 102.605469 96.359375 103.226562 97 C 103.847656 97.640625 104.515625 98.226562 105.230469 98.761719 C 105.945312 99.300781 106.695312 99.777344 107.480469 100.195312 C 108.269531 100.613281 109.085938 100.96875 109.929688 101.257812 L 192.261719 130.257812 Z M 261.144531 154.304688 " fill-opacity="1" fill-rule="nonzero"/><path fill="#39a23a" d="M 98.367188 206.082031 C 98.367188 206.546875 98.398438 207.015625 98.453125 207.476562 C 98.511719 207.941406 98.59375 208.398438 98.707031 208.851562 C 98.816406 209.304688 98.953125 209.75 99.117188 210.1875 C 99.28125 210.625 99.472656 211.050781 99.6875 211.464844 C 99.902344 211.878906 100.140625 212.28125 100.402344 212.667969 C 100.664062 213.050781 100.949219 213.421875 101.253906 213.773438 C 101.5625 214.125 101.886719 214.457031 102.234375 214.769531 C 102.578125 215.085938 102.941406 215.375 103.324219 215.644531 C 103.703125 215.914062 104.097656 216.160156 104.507812 216.382812 C 104.917969 216.605469 105.339844 216.804688 105.773438 216.976562 C 106.207031 217.148438 106.648438 217.292969 107.097656 217.414062 C 107.550781 217.53125 108.007812 217.625 108.46875 217.691406 C 108.929688 217.753906 109.394531 217.792969 109.859375 217.800781 C 110.324219 217.8125 110.789062 217.792969 111.253906 217.746094 C 111.71875 217.703125 112.179688 217.628906 112.632812 217.527344 C 113.089844 217.425781 113.535156 217.296875 113.976562 217.144531 L 232.910156 175.332031 C 233.257812 175.199219 233.578125 175.019531 233.871094 174.789062 C 234.164062 174.558594 234.414062 174.289062 234.628906 173.984375 C 234.839844 173.675781 235 173.34375 235.109375 172.988281 C 235.21875 172.632812 235.277344 172.269531 235.277344 171.898438 C 235.277344 171.523438 235.21875 171.160156 235.109375 170.804688 C 235 170.449219 234.839844 170.117188 234.628906 169.808594 C 234.414062 169.503906 234.164062 169.234375 233.871094 169.003906 C 233.578125 168.773438 233.257812 168.59375 232.910156 168.460938 L 185.535156 151.730469 L 168.382812 145.71875 C 165.160156 144.582031 161.835938 144.015625 158.417969 144.015625 C 155 144.015625 151.679688 144.582031 148.453125 145.71875 L 109.894531 159.253906 C 109.054688 159.546875 108.238281 159.902344 107.453125 160.320312 C 106.667969 160.742188 105.917969 161.21875 105.207031 161.753906 C 104.496094 162.292969 103.828125 162.878906 103.207031 163.519531 C 102.585938 164.160156 102.019531 164.847656 101.507812 165.574219 C 100.992188 166.304688 100.539062 167.066406 100.144531 167.867188 C 99.75 168.667969 99.417969 169.492188 99.152344 170.34375 C 98.886719 171.195312 98.6875 172.0625 98.554688 172.945312 C 98.425781 173.828125 98.363281 174.714844 98.367188 175.605469 Z M 98.367188 206.082031 " fill-opacity="1" fill-rule="nonzero"/></svg> */}
    <a className="text-green-500 text-2xl font-bold pl-5">HackHub</a>
    {/* function with icons for toggling theme  */}
    {/* call theme toggle function here */}
    {/* <button className="btn btn-ghost btn-sm rounded-btn" onClick={toggleTheme}>
    </button> */}
    
    </div>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><a>Blogs</a></li>
      <li tabIndex={0}>
        <a>
          Community
          {/* <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg> */}
        </a>
        {/* <ul className="p-2">
          <li><a>Submenu 1</a></li>
          <li><a>Submenu 2</a></li>
        </ul> */}
      </li>
      <li><a>Builders</a></li>
    </ul>
  </div>
  <div className="navbar-end mr-5">
  <button
          aria-label='Toggle Dark Mode'
          type='button'
          className='w-8 h-8 rounded'
          onClick={() => setTheme(theme === 'night' ? 'winter' : 'night')}
        >
          {theme === 'night' ? (<>
            <FaSun className='w-5 h-5' />
            {console.log(theme)}</>
          ) : (<>
            <FaMoon className='w-5 h-5' />
            {console.log(theme)}</>
          )}
        </button>
    {!session && 
    <div className="hover:outline-1 cursor-pointer  flex flex-row items-center  btn btn-ghost  "
    onClick={() => void signIn()}
    >
  <div className="items-center flex gap-2 mr-2 ">
    <BiUser />
    </div >
        Sign in
    </div>}
    {session && <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src={session.user.image as string} />
        </div>
      </label>
      <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
    }
    </div>
    </div>
 </>
    

};
 