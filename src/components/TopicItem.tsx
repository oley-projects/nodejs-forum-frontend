import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useFormItemContext } from '../context/formItemContext';
import { useTopicContext } from '../context/topicContext';
import ItemAction from './ItemAction';

interface ITopicItemProps {
  id: number;
  name: string;
  description: string;
  creator: { _id: string; name: string };
  createdAt: string;
  posts: [];
  views: string;
  lastPostUser: string;
  lastPostCreatedAt: string;
}
const TopicItem = ({
  id,
  name,
  description,
  creator,
  createdAt,
  posts,
  views,
  lastPostUser,
  lastPostCreatedAt,
}: ITopicItemProps) => {
  const { openModalForum, setFormItem } = useFormItemContext();
  const { deleteTopic /*, getTopic*/ } = useTopicContext();

  const editHandler = () => {
    setFormItem({
      id,
      name,
      description,
      action: 'edit',
      type: 'topic',
    });
    openModalForum();
  };

  /* const clickTopicHandler = () => {
    getTopic(id);
  }; */
  return (
    <WrapTopicItem className='grid-table-item'>
      <div>
        <div>
          <Link
            className='inline-link'
            to={`/viewtopic/${id}`}
            // onClick={clickTopicHandler}
          >
            {name}
          </Link>
        </div>
        <div>
          by {creator.name}, {createdAt}
        </div>
      </div>
      <div className='align-center'>
        <div>{posts?.length || 0}</div>
        <div>Replies</div>
      </div>
      <div className='align-center'>
        <div>{views}</div>
        <div>Views</div>
      </div>
      <div className='align-right'>
        <div>by {lastPostUser}</div>
        <div>{lastPostCreatedAt}</div>
      </div>

      <div className='box'>
        <ItemAction
          onEdit={editHandler}
          onDelete={() => deleteTopic(id)}
          creatorId={creator._id}
          type={'topic'}
        />
      </div>
    </WrapTopicItem>
  );
};

const WrapTopicItem = styled.li`
  @media (min-width: 640px) {
    grid-template-columns: 6fr 1fr 1fr 3fr;
    column-gap: 1.5rem;
    row-gap: 0.5rem;
    .align-center {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .align-right {
      display: flex;
      flex-direction: column;
      align-items: end;
      div:last-child {
        text-align: right;
      }
    }
  }
  @media (min-width: 800px) {
    grid-template-columns: 4fr 1fr 1fr 2fr;
    column-gap: 2rem;
    row-gap: 1rem;
  }
`;

export default TopicItem;
