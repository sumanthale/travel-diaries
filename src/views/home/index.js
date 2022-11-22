import { AuthContext } from "context/AuthContext";
import { PostContext } from "context/PostContext";
import React from "react";
import { useContext } from "react";
import Post from "ui-component/cards/Post";

const Home = React.memo(() => {
  const { posts } = useContext(PostContext);
  const { user } = useContext(AuthContext);

  return (
    <>
      {posts.map((post) => (
        <Post post={post} key={post._id} uid={user?.uid} />
      ))}
    </>
  );
});
export default Home;
