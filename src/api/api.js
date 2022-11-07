import axios from "axios";
const BASE_URL = "http://localhost:8080";

const USER_URL = BASE_URL + "/api/user";

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
