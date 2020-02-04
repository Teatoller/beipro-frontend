import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "../../axios";
import { setLogout } from "../../redux/actionCreators/authActions";

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigate: false,
      errors: {}
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
      .get(`/logout`, config)
      .then(res => {
        const message = res.data;
        localStorage.clear();
        this.setState({ 
          navigate: true,
          message 
        });
      })
      .catch(err => {
        console.log("this...", err);
        this.setState({errors: err.res.request.response});
        
      });
  };

  render() {
    const { navigate, message, errors } = this.state;

    console.log("logout msg...", message);
    console.log("logout errors..>>>", errors);

    if (navigate) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <NavLink to="/" className="active" onClick={this.handleLogout}>
          Logout
        </NavLink>
      </div>
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
