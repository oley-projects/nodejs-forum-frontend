import SinglePost from './SinglePost';

interface IPostListProps {
  posts: [
    {
      id: number;
      topic: { name: string; id: number };
      description: string;
      creator: { name: string };
      createdAt: number;
    }
  ];
}

const PostList = ({ posts }: IPostListProps) => {
  return (
    <>
      {posts?.length > 0 &&
        posts?.map((post, idx) =>
          idx < 10 ? <SinglePost key={post.id} {...post} /> : null
        )}
    </>
  );
};
export default PostList;
