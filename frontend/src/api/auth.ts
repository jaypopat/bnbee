import api from "./index";
const PREFIX = "Bearer ";

// Makes a request to the login api and return a jwt token
async function getAuthToken(email: string, password: string) {
  return api.post('/login', {
      email, password
  })
  .then(response => {
    return response.headers["authorization"]?.replace(PREFIX, '');
  });
}

// Updates the auth token into localStorage and into the api instance
function setAuthToken(auth_token?: string) {
  if (!auth_token) {
    localStorage.removeItem("auth_token");
    delete api.defaults.headers.common['Authorization'];
    return;
  }
  localStorage.setItem("auth_token", auth_token);
  api.defaults.headers.common['Authorization'] = "Bearer " + auth_token;
}

export {
  getAuthToken, setAuthToken
};