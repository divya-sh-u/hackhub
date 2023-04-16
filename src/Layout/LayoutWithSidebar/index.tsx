import { FC } from "react";
import { Header } from "~/components/Header";
import SideBar  from "~/components/SideBar";
interface LayoutWithSideBarProps{}
export const LayoutWithSideBar: FC<LayoutWithSideBarProps> = ({children}:React.PropsWithChildren) => {
    
    return (
        <>
        <Header/>
        <div className="flex grid-cols-12 space-x-20">
        <SideBar/>
        {children}
        </div>
        </>
    )   
};