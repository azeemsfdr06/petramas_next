import { get, post, put } from "axios";
import { settings as s } from "../Settings";

export const getUrl = (path) => s.baseUrl + path;

export const getUserInfo = () => {
  const user = JSON.parse(localStorage.getItem(s.userObj));
  if (user) {
    return user;
  }
  return null;
};

export const postData = async (relativeUrl, data) => {
  const url = getUrl(relativeUrl);
  const response = await post(url, data);
  return response;
};

export const postDatawithForm = (relativeUrl, data) => {
  const url = getUrl(relativeUrl);
  const options = {
    method: "POST",
    url,
    headers: {
      // Authorization: "Basic " + auth,
      "Content-Type": "multipart/form-data",
    },
    formData: {
      file: fs.createReadStream(data),
    },
  };
};

export const isLogin = () => {
  const user = getUserInfo();
  if (user && user.token && user.login_time) {
    const tokenCreationDate = new Date(user.login_time);
    const day = 86400000;
    const now = new Date();
    const diff = now - tokenCreationDate;
    if (diff < day) {
      return true;
    }
    return false;
  }
  return false;
};

export const getData = async (relativeUrl, params = null) => {
  const url = getUrl(relativeUrl, params);
  const response = await get(url);
  return response;
};

export const putData = async (relativeUrl, data) => {
  const url = getUrl(relativeUrl);
  const response = await put(url, data);
  return response;
};
