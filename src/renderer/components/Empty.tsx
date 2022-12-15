import { Empty } from '@douyinfe/semi-ui';
import { IllustrationConstruction } from '@douyinfe/semi-illustrations';
import { IllustrationConstructionDark } from '@douyinfe/semi-illustrations';

type Props = {
  description: string;
};

export default (props: Props) => {
  const { description } = props;
  return (
    <Empty
      image={<IllustrationConstruction style={{ width: 150, height: 150 }} />}
      darkModeImage={
        <IllustrationConstructionDark style={{ width: 150, height: 150 }} />
      }
      description={description}
      style={{ width: '100%', padding: '30px' }}
    />
  );
};
