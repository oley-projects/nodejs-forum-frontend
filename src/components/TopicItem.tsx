import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useFormItemContext } from '../context/formItemContext';
import { useForumContext } from '../context/forumContext';
import ItemAction from './ItemAction';

interface ITopicItemProps {
  id: number;
  name: string;
  description: string;
  createdUser: string;
  createdAt: string;
  replies: string;
  views: string;
  lastPostUser: string;
  lastPostCreatedAt: string;
}
const TopicItem = ({
  id,
  name,
  description,
  createdUser,
  createdAt,
  replies,
  views,
  lastPostUser,
  lastPostCreatedAt,
}: ITopicItemProps) => {
  const { openModalForum, setFormItem } = useFormItemContext();
  const { deleteTopic } = useForumContext();

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
  return (
    <WrapTopicItem className='grid-table-item'>
      <div>
        <div>
          <Link className='inline-link' to={`/viewtopic/${id}`}>
            {name}
          </Link>
        </div>
        <div>
          by {createdUser}, {createdAt}
        </div>
      </div>
      <div className='align-center'>
        <div>{replies}</div>
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
        <ItemAction onEdit={editHandler} onDelete={() => deleteTopic(id)} />
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
