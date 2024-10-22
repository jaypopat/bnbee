import api from "./index";

async function getUser() {
  return api.get('/me')
    .then(response => {return response.data});
}

export {
  getUser
}