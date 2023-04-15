import { createContext, useContext } from 'react';

export enum Theme {
  Dark = 'night',
  Light = 'winter',
}
export type ThemeContextType = {
  theme: Theme;
  setTheme: (Theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType>({ theme: Theme.Dark, setTheme: theme => {console.log('theme changed')}});
export const useTheme = () => useContext(ThemeContext);