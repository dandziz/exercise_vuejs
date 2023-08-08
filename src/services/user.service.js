import config from "../config";
const CryptoJS = require("crypto-js");

export const userService = {
  login,
  rememberAccount,
  getRememberAccount,
  logout,
};

function filterObject(object, keysToRemove) {
  return Object.fromEntries(
    Object.entries(object).filter(([key]) => !keysToRemove.includes(key))
  );
}

async function login(object) {
  try {
    const { account, password, memory } = object;
    const response_email = await fetch(`${config.apiUrl}?email=${account}`);
    const response_username = await fetch(
      `${config.apiUrl}?username=${account}`
    );
    const users_email = await handleResponse(response_email);
    const users_username = await handleResponse(response_username);
    let flags = "";
    if (Array.isArray(users_email) && users_email.length > 0) {
      flags = "email";
    } else if (Array.isArray(users_username) && users_username.length > 0) {
      flags = "username";
    } else {
      return false;
    }
    if (flags != "") {
      const client_password = CryptoJS.MD5(password).toString();
      const user = flags === "email" ? users_email[0] : users_username[0];
      if (client_password === user.password) {
        const current_user = filterObject(user, ["password"]);
        current_user["token"] = CryptoJS.MD5(
          user.email + user.password
        ).toString();
        rememberAccount(memory, user, password);
        localStorage.setItem("current_user", JSON.stringify(current_user));
        return current_user;
      }
    }
  } catch (error) {
    return false;
  }
}

function rememberAccount(memory, user, password) {
  if (memory) {
    const store_user = {
      email: user.email,
      password: password,
    };
    localStorage.setItem("store_user", JSON.stringify(store_user));
  } else {
    localStorage.removeItem("store_user");
  }
}

function getRememberAccount() {
  const reAccount = localStorage.getItem("store_user");
  if (reAccount) {
    return reAccount;
  } else return null;
}

function logout() {
  localStorage.removeItem("current_user");
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        logout();
        location.reload(true);
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}
