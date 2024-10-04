import { useEffect, useState } from "react"
import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons"

const ThemeSwitcher = () => {
    const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

    // Set theme based on user selection or system preference
    useEffect(() => {
      const root = window.document.documentElement;
  
      if (theme === 'system') {
        const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.remove('light', 'dark');
        root.classList.add(systemPreference);
      } else {
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
      }
    }, [theme]);
  
    const handleThemeChange = (mode: 'light' | 'dark' | 'system') => {
      setTheme(mode);
      localStorage.setItem('theme', mode);
    };
  
    useEffect(() => {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system';
      if (savedTheme) {
        setTheme(savedTheme);
      } else {
        setTheme('system');
      }
    }, []);
  
  return (
    <div className="flex flex-row gap-1">
      <button className={`rounded-lg outline px-4 py-2 ${theme === 'light' ? 'bg-gray-300' : ''}`} onClick={()=>{handleThemeChange('light')}}><SunIcon className="h-[1.2rem] w-[1.2rem]"/></button>
      <button className={`rounded-lg outline px-4 py-2 ${theme === 'light' ? 'bg-gray-300' : ''}`} onClick={()=>{handleThemeChange('dark')}}><MoonIcon className="h-1.2rem] w-1.2rem] rotate-90 transition-all dark:rotate-0"/></button>
      <button className={`rounded-lg outline px-4 py-2 ${theme === 'light' ? 'bg-gray-300' : ''}`} onClick={()=>{handleThemeChange('system')}}><DesktopIcon className="h-[1.2rem] w-[1.2rem] "/></button>
    </div>
  )
}

export default ThemeSwitcher
