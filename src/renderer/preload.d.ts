declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        myPing(): void;
        on(
          channel: string,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: string, func: (...args: unknown[]) => void): void;
      };
    };
    serialAPI: {
      open: (path:string, baudRate:number) => void,
      write: (buf:string) => void,
      read: (callback:any) => void,
      on(
        channel: string,
        func: (...args: unknown[]) => void
      ): (() => void) | undefined;
      close: ()=>void;
    }
  }
}

export {};
