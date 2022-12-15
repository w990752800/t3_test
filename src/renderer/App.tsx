import { useState } from 'react';
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

  // 串口通信
  // window.serialAPI.read(readHandle);
  const sendMsg = (task: CheckOutObj) => {
    return new Promise((resolve, reject) => {
      window.serialAPI.write(
        JSON.stringify({ [task.writeContent]: task.type }, undefined, 1)
      );
      window.serialAPI.on('serial:write', (data: any) => {
        if (data && data.err) {
          changeCurrentTest(task.id, {
            status: 'fail',
          });
          resolve(false);
          Toast.destroyAll();
          Toast.error(data.errMsg);
          return;
        }

        if (task.type === 'auto') {
          setTimeout(() => {
            changeCurrentTest(task.id, {
              status: 'success',
            });
            resolve(true);
          }, 2000);
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
          setTimeout(() => {
            changeCurrentTest(task.id, {
              status: 'success',
            });
            resolve(true);
          }, 2000);
        } else {
          changeCurrentTest(task.id, {
            status: 'fail',
          });
          resolve(false);
        }
      });
    });
  };

  // 重置测试项目
  const resetTestItem = () => {
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
      const respond = Uint8ArrayToString(data);
      Toast.destroyAll();
      Toast.info(respond);
    });
  };

  const startTask = async () => {
    for (let task of Object.values(test)) {
      console.log(task, 'task=>');
      await runTask(task);
    }
    setStart(false);
  };

  const runTask = (task: CheckOutObj) => {
    setCurrentTest(task.id);
    changeCurrentTest(task.id, {
      status: 'loading',
    });
    return sendMsg(task);
  };

  const hasSelectPort = () => !port;

  const portSelectChange = (port: string) => setPort(port);

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
