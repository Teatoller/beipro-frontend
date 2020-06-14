import React, { Component } from "react";
import { toast } from "react-toastify";
import { bindActionCreators } from "redux";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "../../../axios";
import { setLogout } from "../../../redux/actionCreators/authActions";

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigate: false
    };
  }

  handleLogout = e => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    };
    axios
      .get(`/auth/logout`, config)
      .then(res => {
        if (res) {
          localStorage.clear();
          this.setState({
            navigate: true
          });
        }
      })
      .catch(err => {
        throw err;
      });
  };

  render() {
    const { navigate } = this.state;

    if (navigate) {
      toast.success("You have been succesfully logged out");
      return <Redirect to="/" />;
    }
    return (
      <>
        <NavLink to="/" className="active" onClick={this.handleLogout}>
          Logout
        </NavLink>
      </>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setLogout
    },
    dispatch
  );

export default connect(mapDispatchToProps)(Logout);
