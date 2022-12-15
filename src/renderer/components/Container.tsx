import { useEffect } from 'react';
import { List, Space, Typography } from '@douyinfe/semi-ui';
import { IconClose, IconTick, IconSpin } from '@douyinfe/semi-icons';
import { CheckOut } from '../utils/testData';
const { Title } = Typography;
type Props = {
  list: CheckOut;
};
export default (props: Props) => {
  const { list } = props;

  const resData = () => {
    const data = [
      <Space
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Title heading={4}>xxx</Title>
        <IconClose size="extra-large" style={{ color: '#E91E63' }} />
        <IconClose size="extra-large" style={{ color: '#6A3AC7' }} />
        <IconTick size="extra-large" style={{ color: '#6A3AC7' }} />
        <IconSpin size="extra-large" spin />
      </Space>,
      '从明天起，做一个幸福的人',
      '喂马，劈柴，周游世界',
      '从明天起，关心粮食和蔬菜',
      '我有一所房子，面朝大海，春暖花开',
      '我有一所房子，面朝大海，春暖花开',
      '我有一所房子，面朝大海，春暖花开',
      '我有一所房子，面朝大海，春暖花开',
      '我有一所房子，面朝大海，春暖花开',
      '我有一所房子，面朝大海，春暖花开',
      '我有一所房子，面朝大海，春暖花开',
      '我有一所房子，面朝大海，春暖花开',
      '我有一所房子，面朝大海，春暖花开',
      '我有一所房子，面朝大海，春暖花开',
      '我有一所房子，面朝大海，春暖花开',
      '我有一所房子，面朝大海，春暖花开',
    ];
  };

  const renderIcon = (status: 'none' | 'loading' | 'fail' | 'success') => {
    switch (status) {
      case 'none':
        return '';
      case 'loading':
        return <IconSpin size="extra-large" spin />;
      case 'fail':
        return <IconClose size="extra-large" style={{ color: 'red' }} />;
      case 'success':
        return <IconTick size="extra-large" style={{ color: '#6A3AC7' }} />;
      default:
        return '';
    }
  };

  useEffect(() => {
    // console.log(list, 'list');
  }, [list]);

  return (
    <List
      style={{ width: '100%', fontSize: '20px' }}
      size="large"
      //   header={<div>Header</div>}
      //   footer={<div>Footer</div>}
      bordered
      dataSource={Object.values(list)}
      renderItem={(item) => (
        <List.Item>
          <Space
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Title heading={4}>{item.name}</Title>
            {renderIcon(item.status)}
          </Space>
        </List.Item>
      )}
    />
  );
};
