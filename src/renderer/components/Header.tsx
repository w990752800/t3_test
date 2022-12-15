import { Button, Select, Space, Typography } from '@douyinfe/semi-ui';
import { IconFavoriteList } from '@douyinfe/semi-icons';
const { Title } = Typography;
type Props = {
  ports: Array<{
    path: string;
  }>;
  hasSelectPort: () => boolean;
  portSelectChange: (port: string) => void;
  startTest: () => void;
  start: boolean;
};
export default (props: Props) => {
  const { ports, hasSelectPort, portSelectChange, startTest, start } = props;
  return (
    <Space style={{ paddingTop: '30px' }}>
      {/* 选择串口 */}
      <label
        style={{ marginRight: '15px', display: 'flex', alignItems: 'center' }}
      >
        <span style={{ marginRight: '15px', fontWeight: 'bold' }}>
          <Title heading={4}>选择串口：</Title>
        </span>
        <Select
          disabled={start}
          showClear
          placeholder="请选择串口"
          style={{ width: 300, height: 42 }}
          validateStatus="warning"
          prefix={<IconFavoriteList />}
          onChange={(port) => portSelectChange(port as string)}
        >
          {ports.length ? (
            ports.map((v: { path: string }) => (
              <Select.Option key={v.path} value={v.path}>
                {v.path}
              </Select.Option>
            ))
          ) : (
            <Select.Option disabled>没有串口</Select.Option>
          )}
        </Select>
      </label>
      {/* 开始测试 */}
      <Button
        disabled={hasSelectPort()}
        theme="solid"
        type="primary"
        size="large"
        onClick={startTest}
        loading={start}
        style={{
          fontWeight: 'bold',
          fontSize: '20px',
        }}
      >
        开始生产测试
      </Button>
      {/* list */}
    </Space>
  );
};
