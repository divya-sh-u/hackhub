import { FC } from "react";
import { Header } from "~/components/Header";

interface MainLayoutProps{}
export const MainLayout: FC<MainLayoutProps> = ({children}:React.PropsWithChildren) => {
    
    return (
        <>
        <Header/>
        {children}
        
        </>
    )
    

};