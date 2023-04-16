import { createContext, useContext } from 'react';

export enum Theme {
  Dark = 'night',
  Light = 'winter',
}
export type ThemeContextType = {
  theme: Theme;
  setTheme: (Theme: Theme) => Theme.Light ;
}

export const ThemeContext = createContext<ThemeContextType>({ theme: Theme.Dark, setTheme: () => {console.log('setTheme'); return Theme.Light }});
export const useTheme = () => useContext(ThemeContext);