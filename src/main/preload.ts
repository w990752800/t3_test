import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
    },
    on(channel: string, func: (...args: unknown[]) => void) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
          func(...args);
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, subscription);

        return () => ipcRenderer.removeListener(channel, subscription);
      }

      return undefined;
    },
    once(channel: string, func: (...args: unknown[]) => void) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (_event, ...args) => func(...args));
      }
    },
  },
});

contextBridge.exposeInMainWorld('serialAPI',{
  open: (path:string, baudRate:number) => ipcRenderer.send('serial:open', path, baudRate),
  write: (buf:string) => {
    ipcRenderer.send('serial:write', buf)
  },
  read: (callback:any) => {
    ipcRenderer.on('serial:read', callback)
  },
  on(channel: string, func: (...args: unknown[]) => void) {
    const validChannels = ['serial:open','serial:write'];
    if (validChannels.includes(channel)) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    }
    return undefined;
  },
  close: ()=>{
    ipcRenderer.on('serial:close', null)
  },
})

