import { createContext, useContext } from 'react';

export enum Theme {
  Dark = 'night',
  Light = 'winter',
}
export type ThemeContextType = {
  theme: Theme;
  setTheme: (Theme: Theme) => Theme.Light ;
}

export const ThemeContext = createContext<ThemeContextType>({ theme: Theme.Dark, setTheme: 
() => {
    // throw new Error('setTheme function not implemented');
    console.log('theme changed')
}
});
export const useTheme = () => useContext(ThemeContext);