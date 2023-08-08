import config from "../config";
export const customerService = {
  addCustomer,
  getAllCustomers,
  getByEmail,
  getByUsername,
  escapeRegExp,
};

async function addCustomer(object) {
  if (object) {
    if (
      object.profile_picture &&
      object.username &&
      object.password &&
      object.email &&
      object.fullname &&
      object.phone_number &&
      object.address &&
      object.id_card &&
      object.tags &&
      Array.isArray(object.tags)
    ) {
      try {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(object),
        };
        const response = fetch(`${config.apiUrl}`, requestOptions);
        const res = await response;
        const user = await handleResponse(res);
        if (user) {
          return user;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    }
  }
  return false;
}
async function getAllCustomers() {
  try {
    const response = await fetch(`${config.apiUrl}`);
    const users = await handleResponse(response);
    if (Array.isArray(users) && users.length > 0) {
      return users;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
async function getByEmail(email) {
  try {
    const response = await fetch(`${config.apiUrl}?email=${email}`);
    const users = await handleResponse(response);
    if (Array.isArray(users) && users.length > 0) {
      return users[0];
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}
async function getByUsername(username) {
  try {
    const response = await fetch(`${config.apiUrl}?username=${username}`);
    const users = await handleResponse(response);
    if (Array.isArray(users) && users.length > 0) {
      return users[0];
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        location.reload(true);
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}
