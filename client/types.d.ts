type EventPaylaodMapping = { //Different ipc mappings (MUST CORRESPOND TO WINDOW INTERFACE BELOW)
    onClose: void;
    onPopupClose: void;
    onFullScreen: void;
    onMinimize: void;
}

interface Window { //Used in frontend through exposed ipc functions
    electron: {
        onClose: () => void,
        onPopupClose: () => void,
        onFullScreen: () => void,
        onMinimize: () => void
    }
}
