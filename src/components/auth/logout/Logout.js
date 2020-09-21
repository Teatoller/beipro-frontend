/* eslint-disable no-shadow */
import React, { useState } from "react";
import { toast } from "react-toastify";
import { bindActionCreators } from "redux";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "../../../axios";
import { setLogout } from "../../../redux/actionCreators/authActions";
import { Spinner } from "../../../spinner/Spinner";
import Error from "../../Error";

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const [navigate, setNavigate] = useState(false);

  const handleLogout = e => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    };
    axios
      .get(`/logout`, config)
      .then(res => {
        if (res) {
          localStorage.clear();
          setNavigate(true);
        }
      })
      .catch(errors => {
        setErrors(errors.response.request.response);
        setLoading(false);
      });
  };

  if (navigate) {
    toast.success("You have been succesfully logged out");
    return <Redirect to="/" />;
  }

  return (
    <>
      <span>{loading ? <Spinner /> : null}</span>
      <NavLink to="/" className="active" onClick={handleLogout}>
        Logout
      </NavLink>
      <span className={`text-danger ${errors ? "is-invalid" : ""}`}>
        <Error error={errors || null} />
      </span>
    </>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setLogout
    },
    dispatch
  );

export default connect(mapDispatchToProps)(Logout);
