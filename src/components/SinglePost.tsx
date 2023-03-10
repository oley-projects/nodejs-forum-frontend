interface ISinglePostType {
  text: string;
}

const SinglePost = ({ text }: ISinglePostType) => {
  return (
    <div>
      <p>{text}</p>
    </div>
  );
};
export default SinglePost;
