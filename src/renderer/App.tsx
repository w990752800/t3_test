import { useEffect, useState } from 'react';
import { Space, BackTop, Toast, Modal } from '@douyinfe/semi-ui';

import './App.css';
import Header from './components/Header';
import Container from './components/Container';
import Empty from './components/Empty';

import { testData, Uint8ArrayToString } from './utils/index';
import { CheckOutObj } from './utils/testData';

type Props = {
  ports: Array<{ path: string }>;
};

export default (props: Props) => {
  const { ports } = props;
  const [port, setPort] = useState('');
  let [test, setTest] = useState(testData.CHECK_OUT);
  const [currentTest, setCurrentTest] = useState('');
  const [start, setStart] = useState(false);
  let [respond, setRespond] = useState('');

  // 串口通信
  // window.serialAPI.read(readHandle);
  const sendMsg = (task: CheckOutObj) => {
    console.log('4444');
    return new Promise((resolve, reject) => {
      window.serialAPI.write(
        JSON.stringify({ [task.writeContent]: task.type }, undefined, 1)
      );
      // window.serialAPI.on('serial:write', async (data: any) => {
      //   console.log(data,'data')
      //   if (data && data.err) {
      //     changeCurrentTest(task.id, {
      //       status: 'fail',
      //     });
      //     resolve(false);
      //     Toast.destroyAll();
      //     Toast.error(data.errMsg);
      //     return;
      //   }

      // });

      if (task.type === 'auto') {
        console.log('ccc');
          console.log('abc');
          const timer = setInterval(()=>{
            if(respond){
              clearInterval(timer)
              changeCurrentTest(task.id, {
                status: !!respond?'success':'fail',
              });
              console.log('ddd');
              respond = "";
              setRespond(respond)
              resolve(true);
            }
          }, 1000)


      } else if (task.type === 'ack') {
        Modal.destroyAll();
        Modal.confirm({
          title: '提示',
          content: task.tip,
          maskClosable: false,
          closable: false,
          okText: '是',
          cancelText: '否',
          onOk: () => {
            changeCurrentTest(task.id, {
              status: 'success',
            });
            resolve(true);
          },
          onCancel: () => {
            changeCurrentTest(task.id, {
              status: 'fail',
            });
            resolve(true);
          },
        });
      } else if (task.type === 'tip') {
        Toast.destroyAll();
        Toast.info(task.tip);
        const timer = setInterval(()=>{
          if(respond){
            clearInterval(timer);
            changeCurrentTest(task.id, {
              status: !!respond?'success':'fail',
            });
            respond = ""
            setRespond(respond)
            resolve(true);
          }
        },1000)


      } else {
        changeCurrentTest(task.id, {
          status: 'fail',
        });
        resolve(false);
      }
    });
  };

  // 重置测试项目
  const resetTestItem = () => {
    respond = "";
    setRespond(respond)
    setStart(false);
    test = testData.CHECK_OUT;
    setTest(testData.CHECK_OUT);
  };

  const changeCurrentTest = (key: string, data: Record<string, any>) => {
    test = {
      ...test,
      [key]: {
        ...test[key],
        ...data,
      },
    };
    setTest(test);
  };

  const startTest = () => {
    // 开始任务前，重置任务项
    resetTestItem();
    setStart(true);
    // 串口连接
    window.serialAPI.open(port, 115200);
    window.serialAPI.on('serial:open', (data: any) => {
      console.log(data, 'data');
      if (data && data.err) {
        // 串口连接失败！
        resetTestItem();
        Toast.destroyAll();
        Toast.error(data.errMsg);
      } else {
        // 开始任务
        startTask();
      }
    });
    window.serialAPI.read((_: any, data: any) => {
      console.log(data, 'data');
      respond = Uint8ArrayToString(data);
      console.log(respond, 'respond');
      setRespond(respond)
      Toast.destroyAll();
      Toast.info(respond);
    });
  };

  const startTask = async () => {
    for (const task of Object.values(test)) {
      console.log(task, 'task=>');
      await runTask(task);
    }
    setStart(false);
  };

  const runTask = (task: CheckOutObj) => {
    console.log('111');
    setCurrentTest(task.id);
    changeCurrentTest(task.id, {
      status: 'loading',
    });
    console.log('2222');
    return sendMsg(task);
  };

  const hasSelectPort = () => !port;

  const portSelectChange = (port: string) => setPort(port);

  useEffect(() => {
    return () => {
      window.serialAPI.close((data: any) => {
        console.log(data, 'data');
      });
    };
  }, []);

  return (
    <Space vertical>
      <Header
        ports={ports}
        hasSelectPort={hasSelectPort}
        portSelectChange={portSelectChange}
        startTest={startTest}
        start={start}
      ></Header>
      <Space style={{ width: '700px', padding: '30px 0' }}>
        {hasSelectPort() ? (
          <Empty description="未选择串口" />
        ) : (
          <Container list={test}></Container>
        )}
      </Space>
      <BackTop visibilityHeight={40} />
    </Space>
  );
};
