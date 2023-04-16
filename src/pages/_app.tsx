import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeContext,Theme} from "~/utils/themeContext";
import { api } from "~/utils/api";
import { useTheme} from "~/utils/themeContext";
import "~/styles/globals.css";
import { useState } from "react";
import { ThemeProvider } from 'next-themes'
import { Toaster } from "react-hot-toast";
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {

  // const [theme, setTheme] = useState(Theme.Dark)
  
  const {theme, setTheme} = useTheme();
  return (
    <SessionProvider session={session}>
      <ThemeContext.Provider value={{ theme, setTheme }} >
      <ThemeProvider>
      <Toaster />
      <Component {...pageProps} />
      </ThemeProvider>
      </ThemeContext.Provider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
