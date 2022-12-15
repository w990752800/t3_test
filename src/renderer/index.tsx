import { render } from 'react-dom';
import { Spin } from '@douyinfe/semi-ui';
import App from './App';

render(
  <div
    style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Spin size="large" />
  </div>,
  document.getElementById('root')
);

window.electron.ipcRenderer.on('ipc-example', (arg) => {
 setTimeout(()=>{
  render(
    <App ports={arg as Array<{ path: string }>} />,
    document.getElementById('root')
  );
 },1000)

});

  window.electron.ipcRenderer.myPing();
