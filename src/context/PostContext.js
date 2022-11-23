import React, { useEffect, useState } from "react";

import { deletePost, getPosts } from "api/api";

export const PostContext = React.createContext();

export const PostProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { posts } = await getPosts();
      setAllPosts(posts);
      setPosts(posts);
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setIsLoading(false);
  };
  const filterByTitle = (title) => {
    const filteredPosts = allPosts.filter((el) =>
      JSON.stringify(el).toLowerCase().includes(title.toLowerCase())
    );
    setPosts(filteredPosts);
  };

  const filterPosts = (price, checked) => {
    let posts = allPosts.filter(
      (post) =>
        post.price >= price[0] &&
        post.price <= price[1] &&
        post.rating >= checked
    );
    console.log(posts);
    setPosts(posts);
  };
  const reset = () => {
    setPosts(allPosts);
  };
  const deltePostByID = async (req) => {
    try {
      const { status } = await deletePost(req);
      if (!status) throw new Error(`Status is false not Delted`);
      const filteredPosts = allPosts.filter((el) => el._id !== req._id);
      setPosts(filteredPosts);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <PostContext.Provider
      value={{
        error,
        isLoading,
        posts,
        filterByTitle,
        fetchData,
        filterPosts,
        reset,
        deltePostByID,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
