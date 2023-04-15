import { FC } from "react";
import { Header } from "~/components/Header";
import SideBar  from "~/components/SideBar";
interface LayoutWithSideBarProps{}
export const LayoutWithSideBar: FC<LayoutWithSideBarProps> = ({children}:React.PropsWithChildren) => {
    
    return (
        <>
        <Header/>
        <SideBar/>
        {children}
        
        </>
    )   
};