/* eslint-disable no-underscore-dangle */
import React from "react";
import PropTypes from "prop-types";
import axios from "../../axios";
import Error from "../Error";
import Spinner from "../../spinner/Spinner";

class ProfileImg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      loading: false,
      errors: {
        file: ""
      }
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onFormSubmit(e) {
    const { file } = this.state;
    const { history } = this.props;

    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", file);
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "content-type": "multipart/form-data"
      }
    };
    axios
      .post(`/auth/profile`, formData, config)
      .then(response => {
        this.setState({
          loading: false
        });
        if (response) {
          history.push("/profile");
        }
      })
      .catch(error => {
        this.setState({
          errors: {
            file: error.response.request.response
          }
        });
      });
  }

  onChange(e) {
    this.setState({
      file: e.target.files[0]
    });
  }

  render() {
    const { errors, loading } = this.state;

    const dangerStyle = {
      _fontStyle: "italic",
      get fontStyle() {
        return this._fontStyle;
      },
      set fontStyle(value) {
        this._fontStyle = value;
      },
      color: "red"
    };

    return (
      <div>
        <span>{loading ? <Spinner /> : null}</span>
        <form onSubmit={this.onFormSubmit}>
          <h1>Profile Image Upload</h1>
          <input type="file" name="avatar" onChange={this.onChange} />
          <small id="fileHelp" className="form-text text-muted">
            Please upload a valid image file. Size of image should not be more than 2MB.
          </small>
          <span style={errors.file ? dangerStyle : null}>
            <Error error={errors.file ? errors.file : null} />
          </span>
          <button type="submit">Upload</button>
        </form>
      </div>
    );
  }
}
ProfileImg.propTypes = {
  history: PropTypes.shape().isRequired
};

export default ProfileImg;
