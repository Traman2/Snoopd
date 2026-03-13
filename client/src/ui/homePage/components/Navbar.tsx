import { Icon } from '@iconify/react';

function Navbar() {
  const onClose = () => {
    window.electron.onClose();
  }

  const onSetfull = () => {
    window.electron.onFullScreen();
  }

  const onMinimize = () => {
    window.electron.onMinimize();
  }

  return (
    <nav className='h-10 items-center navbar px-4 bg-[#0C0950] flex justify-between'>
      <div>
        <h1 className='text-white/95 font-semibold text-sm'>test</h1>
      </div>
      <div className='flex noDrag gap-4'>
        <button onClick={onMinimize} className='cursor-pointer items-center justify-center hover:opacity-55 transition-all'><Icon icon="mdi:minimize" className='text-white text-xl mt-0.5'/></button>
        <button onClick={onSetfull} className='cursor-pointer items-center justify-center hover:opacity-55 transition-all'><Icon icon="material-symbols:fullscreen" className='text-white text-xl'/></button>
        <button onClick={onClose} className='cursor-pointer items-center justify-center hover:opacity-55 transition-all'><Icon icon="material-symbols:close" className='text-white text-xl'/></button>
      </div>
    </nav>
  )
}

export default Navbar
