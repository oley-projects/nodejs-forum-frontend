import SinglePost from './SinglePost';

interface IPostListProps {
  posts: [
    {
      id: number;
      topic: { name: string; id: number; forum: { id: string; name: string } };
      description: string;
      creator: { name: string; id: string };
      createdAt: number;
    }
  ];
  isLastPosts?: boolean | undefined;
}

const PostList = ({ posts, isLastPosts }: IPostListProps) => {
  return (
    <>
      {posts?.length > 0 &&
        posts?.map((post, idx) =>
          idx < 10 ? (
            <SinglePost key={post.id} {...post} isLastPosts={isLastPosts} />
          ) : null
        )}
    </>
  );
};
export default PostList;
