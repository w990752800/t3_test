import { Modal } from '@douyinfe/semi-ui';

type Props = {
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  okText: string;
  cancelText: string;
  title: string;
  content: string;
};

export default (props: Props) => {
  const {
    visible,
    handleOk,
    handleCancel,
    okText,
    cancelText,
    title,
    content,
  } = props;
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={okText}
      cancelText={cancelText}
      maskClosable={false}
      closable={false}
    >
      <h4>{content}</h4>
    </Modal>
  );
};
