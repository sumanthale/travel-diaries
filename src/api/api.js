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

export const getPlacesData = async (type, sw, ne) => {
  console.log(type, sw, ne);
  try {
    const resp = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
          tr_latitude: ne.lat,
          limit: 10,
        },
        headers: {
          "x-rapidapi-key": process.env.REACT_APP_TRAVEL_API_KEY,
          "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        },
      }
    );
    console.log(resp);
    const {
      data: { data },
    } = resp;
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getWeatherData = async (lat, lng) => {
  try {
    if (lat && lng) {
      const { data } = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            lat,
            lon: lng,
            appid: process.env.REACT_APP_WEATHER_API_KEY,
            units: "metric",
          },
        }
      );

      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
