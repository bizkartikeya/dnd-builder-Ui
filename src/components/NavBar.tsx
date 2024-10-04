import ThemeSwitcher from './ThemeSwitcher'

const NavBar = () => {
  return (
    <nav className='flex justify-between items-center border-b border-border h-[60px] px-4 py-2'>
      <span className='font-bold text-3xl bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text'>Central Platform</span>
      <ThemeSwitcher/>
    </nav>
  )
}

export default NavBar
