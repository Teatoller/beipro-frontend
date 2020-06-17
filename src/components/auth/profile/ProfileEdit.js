import React, { Component } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axios from "../../../axios";
import Nav from "../../Landing/Nav";
import Footer from "../../Landing/Footer";
import Error from "../../Error";
import Spinner from "../../../spinner/Spinner";

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      firstname: "",
      lastname: "",
      errors: {
        firstname: "",
        lastname: ""
      }
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      firstname: localStorage.getItem("firstname"),
      lastname: localStorage.getItem("lastname")
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const { firstname, lastname } = this.state;
    const { history } = this.props;

    const updateData = {
      firstname,
      lastname
    };

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json"
      }
    };

    axios
      .patch(`/auth/profile`, updateData, config)
      .then(response => {
        this.setState({
          loading: true
        });
        if (response) {
          toast.success("Records updated successfully");
          history.push(`/profile`);
        }
      })
      .catch(err => {
        this.setState({
          errors: {
            firstname: err.response.request.response,
            lastname: err.response.request.response
          }
        });
      });
  }

  handleCancelClick = e => {
    const { history } = this.props;

    e.preventDefault();

    history.push("/profile");
    this.setState({ loading: false });
  };

  render() {
    const { errors, firstname, lastname, loading } = this.state;

    const dangerStyle = {
      fontStyle: "italic",
      color: "red"
    };
    return (
      <div>
        <Nav />
        <main className="profile-page mt-3">
          <span>{loading ? <Spinner /> : null}</span>
          <h4>Edit Profile</h4>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="firstname">First Name:</label>
              <input
                type="text"
                name="firstname"
                value={this.firstname}
                onChange={this.onChange}
                className="form-control"
                id="firstname"
                placeholder={firstname}
                aria-describedby="firstname"
                aria-required="true"
                aria-invalid="false"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="lastname">Last Name:</label>
              <input
                type="text"
                name="lastname"
                value={this.lastname}
                onChange={this.onChange}
                className="form-control"
                id="lastname"
                placeholder={lastname}
                aria-describedby="lastname"
                aria-required="true"
                aria-invalid="false"
              />
            </div>
            <div className="form-group">
              <span style={errors.lastname ? dangerStyle : null}>
                <Error error={errors.lastname ? errors.lastname : null} />
              </span>
            </div>

            <div className="text-right mb-3">
              <button
                type="button"
                className="btn btn-sm btn-outline-warning mr-1"
                onClick={this.handleCancelClick}
              >
                Cancel
            </button>
              <input type="submit" className="btn btn-success btn-sm" value="Submit" />
            </div>
          </form>
        </main>
        <Footer />
      </div>
    );
  }
}
ProfileEdit.propTypes = {
  history: PropTypes.shape().isRequired
};
export default ProfileEdit;
