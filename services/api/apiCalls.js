import axios, { get } from 'axios';
import { settings as s } from '../settings';
const getUrl = (ep) => `${s.baseUrl}${ep}`;

export const getData = async (relativeUrl) => {

  // await checkUser();
  // const accessToken = await getToken();
  const accessToken = {}
  const url = getUrl(relativeUrl);
  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      Accept: '*/*',
    },
  };
  try {
    console.log(url)
    const response = await get(url, options);
    console.log(response)
    // console.log('RESPONSE ON GET DATA : ', response);
    return { status: response.status, data: response.data };
  } catch (err) {
    if (err.response) {
      return { status: err.response.status, data: [] };
    }
    return { status: 0, data: [] };
  }
};

export const getDataAnonymously = async (relativeUrl) => {
  const url = getUrl(relativeUrl);
  const options = {
    headers: {
      'Content-Type': 'application/json-patch+json',
      Accept: '*/*',
    },
  };
  try {
    const response = await get(url, options).then((res) => res);
    return { status: response.status, data: response.data };
  } catch (err) {
    if (err.response) {
      return { status: err.response.status, data: [] };
    }
    return { status: 0, data: [] };
  }
};

export const postData = async (relativeUrl, data) => {
  // await checkUser();
  const accessToken = await getToken();
  const url = getUrl(relativeUrl);
  // console.log("postData called!",'Access Token : ', accessToken,"url : ",url)
  const config = {
    method: 'post',
    url,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      Accept: '*/*',
    },
    data,
  };

  try {
    // console.log('From API CALLS : ',url, data );

    const response = await axios(config);
    // console.log('RESPONSE ON POST DATA : ', response);
    // console.log('Axios sent',response );
    return response;
  } catch (err) {
    return { status: null };
  }
};

export const postFormData = async (relativeUrl, user, data) => {
  // await checkUser();
  const accessToken = localStorage.getItem('jwt_access_token');
  const url = getUrl(relativeUrl);
  const config = {
    method: 'post',
    url,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data',
      Accept: '*/*',
    },
    data,
  };

  try {
    const response = await axios(config)
      .then((res) => res)
      .catch((error) => error);
    return response;
  } catch (err) {
    return { status: null };
  }
};

export const postDataAnonymously = async (relativeUrl, data) => {
  const url = getUrl(relativeUrl);
  console.log(url)
  const config = {
    method: 'post',
    url,
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
    },
    data,
  };
  try {
    console.log('API CALLS : ',url, data );
    // alert(url)
  
    const response = await axios(config)
      .then((res) => res)
      .catch((error) => console.log(error.response));
      console.log(response, url)
    return { data: response.data, status: response.status };
  } catch (err) {
    return { status: null };
  }
};

export const uploadFiles = async (relativeUrl, data) => {
  // await checkUser();
  // console.log('Access Token', accessToken);
  
  const url = getUrl(relativeUrl);
  console.log('Url : ' ,url, 'data : ',data);
  const config = {
    url,
    method: 'POST',
    data:data,
    headers: {
      // Accept: 'application/json',
      'Content-Type': 'multipart/form-data'
      // Authorization: `Bearer ${accessToken}`,
      // 'Content-Type': 'multipart/form-data',
      // Accept: '*/*',
    },
  };

  try {
    const response = await axios(config)
      .then((res) =>res)
      .catch((error) => console.log("res,err",error));
    return response;
  } catch (err) {
    return { status: null };
  }
};

// axios({
//   method: "POST",
//   url: serverUrl + "/multiplefiles",
//   data: formData,
//   headers: {
//     "Content-Type": "multipart/form-data"
//   }
// })


export const resetPassword = async (relativeUrl, user, data) => {
  const url = getUrl(relativeUrl);
  const config = {
    method: 'post',
    url,
    headers: {
      Authorization: `Bearer ${user.token}`,
      'Content-Type': 'application/json-patch+json',
      Accept: '*/*',
    },
    data,
  };

  try {
    const response = await axios(config)
      .then((res) => res)
      .catch((error) => error);
    return response;
  } catch (err) {
    return { status: null };
  }
};

// export const postFile = async (relativeUrl, user, data) => {
//   const url = getUrl(relativeUrl);
//   const config = {
//     method: 'post',
//     url,
//     headers: {
//       Authorization: `Bearer ${user.token}`,
//       'Content-Type': 'application/json-patch+json',
//       Accept: '*/*',
//     },
//     data,
//   };

//   try {
//     const response = await axios(config)
//       .then((res) => res)
//       .catch((error) => error);
//     return response;
//   } catch (err) {
//     return { status: null };
//   }
// };

// export const putData = async (relativeUrl, user, data) => {
//   const url = getUrl(relativeUrl);
//   const config = {
//     method: 'put',
//     url,
//     headers: {
//       // Authorization: `Bearer ${user.token}`,
//       'Content-Type': 'application/json',
//     },
//     data: JSON.stringify({ ...data }),
//   };

//   try {
//     const response = await axios(config)
//       .then((res) => res)
//       .catch((error) => error);
//     return response;
//   } catch (err) {
//     return { status: null };
//   }
// };

// export const putFormData = async (relativeUrl, user, data) => {
//   const url = getUrl(relativeUrl);

//   const config = {
//     method: 'put',
//     url,
//     headers: {
//       Authorization: `Bearer ${user.token}`,
//       'Content-Type': 'multipart/form-data',
//       Accept: '*/*',
//     },
//     data,
//   };

//   try {
//     const response = await axios(config)
//       .then((res) => res)
//       .catch((error) => error);
//     return response;
//   } catch (err) {
//     return { status: null };
//   }
// };

// export const deleteData = async (relativeUrl) => {
//   const url = getUrl(relativeUrl);
//   const options = {
//     headers: {
//       // Authorization: `Bearer ${user.token}`,
//       'Content-Type': 'application/json-patch+json',
//       Accept: '*/*',
//     },
//   };

//   try {
//     const response = await axios
//       .delete(url, options)
//       .then((res) => res)
//       .catch((error) => error);
//     return response;
//   } catch (err) {
//     return { status: null };
//   }
// };
