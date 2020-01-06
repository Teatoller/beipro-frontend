import axios from "../../axios";

export const register = newUser => {
  return axios
    .post("/register", newUser, {
      headers: { "Content-Type": "application/json" }
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export const getProfile = () => {
  return axios
    .post("/profile", {
      headers: { Authorization: `Bearer ${localStorage.usertoken}` }
    })
    .then(res => {
      console.log(res);
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
};
