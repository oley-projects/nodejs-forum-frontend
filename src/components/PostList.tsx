// import { useEffect } from 'react';
import SinglePost from './SinglePost';
import { useTopicContext } from '../context/topicContext';

const PostList = () => {
  const { /*getTopic,*/ topic } = useTopicContext();
  /* useEffect(
    () => {
      if (topic) {
        getTopic(topic.id);
      }
    }, // eslint-disable-next-line
    []
  ); */
  return (
    <>
      {topic.posts?.length > 0 &&
        topic.posts.map((post, idx) =>
          idx < 10 ? <SinglePost key={post.id} {...post} /> : null
        )}
    </>
  );
};
export default PostList;
