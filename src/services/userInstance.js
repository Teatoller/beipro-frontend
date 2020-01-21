import cookie from "js-cookie";
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

// export const logout = () => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${localStorage.token}`
//     }
//   };
//   axios.get(`/logout`, config).then(
//     res => {
//       const data = res.data;
//       console.log("done!!!!!", data);
//       localStorage.clear();
//       cookie.remove("token", res.data.access_token);
//     },
//     error => {
//       console.log(error);
//     }
//   );
// };
