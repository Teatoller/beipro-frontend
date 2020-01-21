import axios from "../axios";

export const register = newUser => {
  return axios
    .post("/register", newUser, {
      headers: { "Content-Type": "application/json" }
    })
    .then(res => {})
    .catch(err => {
      console.log(err);
    });
};


