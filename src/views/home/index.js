import { Box } from "@mui/system";
import { AuthContext } from "context/AuthContext";
import { PostContext } from "context/PostContext";
import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import Post from "ui-component/cards/Post";

const Home = React.memo(() => {
  const { posts, deltePostByID, fetchData } = useContext(PostContext);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Box
      sx={{
        p: "20px",
      }}
    >
      {posts.map((post) => (
        <Post
          post={post}
          key={post._id}
          uid={user?.uid}
          deltePostByID={deltePostByID}
        />
      ))}
    </Box>
  );
});
export default Home;
