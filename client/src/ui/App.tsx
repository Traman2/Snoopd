import { Icon, addCollection } from '@iconify/react';
import type { IconifyJSON } from '@iconify/types';
import materialSymbols from '@iconify-json/material-symbols/icons.json';

addCollection(materialSymbols as IconifyJSON);

function App() {
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
    <>
      <div className="flex flex-col h-screen bg-white rounded-xl backdrop-blur-3xl">
        <nav className='h-10 items-center navbar px-4 bg-[#0C0950] flex justify-between'>
          <div>
            <h1 className='text-white/95 font-semibold text-sm'>Snoopd</h1>
          </div>
          <div className='flex noDrag gap-4'>
            <button onClick={onMinimize} className='cursor-pointer items-center justify-center hover:opacity-55 transition-all'><Icon icon="material-symbols:minimize" className='text-white text-xl'/></button>
            <button onClick={onSetfull} className='cursor-pointer items-center justify-center hover:opacity-55 transition-all'><Icon icon="material-symbols:fullscreen" className='text-white text-xl'/></button>
            <button onClick={onClose} className='cursor-pointer items-center justify-center hover:opacity-55 transition-all'><Icon icon="material-symbols:close" className='text-white text-xl'/></button>
          </div>
        </nav>
        <div className='h-full bg-[#161179] '>
          
        </div>
      </div>
    </>
  )
}

export default App
