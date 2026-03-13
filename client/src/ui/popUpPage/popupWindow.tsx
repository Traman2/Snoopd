import { Icon } from '@iconify/react';


export default function PopupLayer() {

  const onClose = () => {
    window.electron.onPopupClose();
  }

  return (
    <div className="flex flex-col bg-black/80 h-screen rounded-xl relative">
      <div className="navbar fixed top-0 left-0 right-0 h-10 flex items-center pt-1 px-4 justify-between rounded-t-xl z-20">
        <div className='flex gap-3 items-center'>
          <h1 className="text-white font-semibold">Screen Share Popup</h1>
          <div className="flex items-center gap-2 bg-red-500/30 border-2 border-red-500 px-3 py-1 rounded-full">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
            <span className="text-red-400 font-bold text-xs tracking-wide">LIVE</span>
          </div>
        </div>

        <div className="noDrag space-x-2 flex items-center">
          <button
            onClick={onClose}
            className="cursor-pointer hover:opacity-55 transition-all"
          >
            <Icon icon="material-symbols:close" className='text-white text-xl'/>
          </button>
        </div>
      </div>

      <div className="mt-10 flex-shrink-0 mx-4 mb-2 overflow-y-auto hide-scrollbar">
        <div className="text-white break-words whitespace-normal">
          <p className='text-white font-light'>This is the popup content</p>
        </div>
      </div>
      <div className='border-b-white/40 border-b-1 mx-4 mt-1' />
      {/* Files */}
      <div className="flex-1 overflow-y-auto hide-scrollbar px-4 pb-4">
        <div className="grid grid-cols-3 gap-3 mt-2 content-start">
          <p>More content here</p>
        </div>
      </div>
    </div>
  );
}