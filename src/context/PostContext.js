import React, { useEffect, useState } from "react";

import { getPosts } from "api/api";

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
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
