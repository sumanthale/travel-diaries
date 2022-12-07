import axios from "axios";
// const BASE_URL = "http://localhost:8080";
const BASE_URL = "https://careful-synapse-369206.uc.r.appspot.com";

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

export const removeSpamWords = async (text) => {
  try {
    const resp = await axios.get(
      `https://community-purgomalum.p.rapidapi.com/json`,
      {
        params: { text, fill_text: " " },
        headers: {
          "X-RapidAPI-Key":
            "dcd9d99848msh7df1a7380d83f1ap10e381jsne8d7894acd13",
          "X-RapidAPI-Host": "community-purgomalum.p.rapidapi.com",
        },
      }
    );
    console.log(resp);
    const {
      data: { result },
    } = resp;
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
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
          "x-rapidapi-key":
            "8917545fd8msh93a437462ac10bcp130d52jsn3e7b9cf5167a",
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
            appid: "4074649b5795010b64c72ad0b34845ef",
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
export const checkout = async (quantity) => {
  fetch(`${BASE_URL}/create-checkout-session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      quantity,
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
      return res.json().then((json) => Promise.reject(json));
    })
    .then(({ url }) => {
      window.open(
        url,
        "_blank" // <- This is what makes it open in a new window.
      );
    })
    .catch((e) => {
      console.error(e.error);
    });
};
