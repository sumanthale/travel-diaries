import axios from "axios";
const BASE_URL = "http://localhost:8080";

const USER_URL = BASE_URL + "/api/user";
const POST_URL = BASE_URL + "/api/post";

export const getUser = async (uid) => {
  let response = null;
  try {
    const data = await axios.get(USER_URL, {
      params: {
        uid,
      },
    });
    if (data.status === 200) {
      response = data.data;
    }
  } catch (error) {
    console.log(error);
  }

  return response;
};
export const registerUser = async (user) => {
  let response = null;

  try {
    const data = await axios.post(USER_URL, user);
    if (data.status === 200) {
      response = data.data;
    }
  } catch (error) {
    console.log(error);
  }
  console.log(response);

  return response;
};
export const updateUserData = async (user) => {
  let response = null;

  try {
    const data = await axios.put(USER_URL, user);
    if (data.status === 200) {
      response = data.data;
    }
  } catch (error) {
    console.log(error);
  }
  console.log(response);

  return response;
};
export const createPost = async (post) => {
  let response = null;

  try {
    const data = await axios.post(POST_URL, post);
    if (data.status === 200) {
      response = data.data;
    }
  } catch (error) {
    console.log(error);
  }
  console.log(response);

  return response;
};
export const getPosts = async (postID) => {
  let response = null;

  try {
    const data = await axios.get(POST_URL, {
      params: postID,
    });
    if (data.status === 200) {
      response = data.data;
    }
  } catch (error) {
    console.log(error);
  }
  console.log(response);

  return response;
};
export const updatePost = async (post) => {
  let response = null;

  try {
    const data = await axios.put(POST_URL, post);
    if (data.status === 200) {
      response = data.data;
    }
  } catch (error) {
    console.log(error);
  }
  console.log(response);

  return response;
};
export const deletePost = async (id) => {
  console.log(id);
  let response = null;

  try {
    const data = await axios.delete(POST_URL, {
      data: id,
    });
    if (data.status === 200) {
      response = data.data;
    }
  } catch (error) {
    console.log(error);
  }
  console.log(response);

  return response;
};
