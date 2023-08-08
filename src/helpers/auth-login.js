import config from "../config";
const CryptoJS = require("crypto-js");
export async function authLogin(account, token) {
  const response = await fetch(`${config.apiUrl}?email=${account}`);
  const user = await handleResponse(response);
  if (CryptoJS.MD5(user.email + user.password).toString() === token) {
    return true;
  }
  return false;
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        return false;
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}
