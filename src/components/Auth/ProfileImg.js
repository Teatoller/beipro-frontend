/* eslint-disable no-underscore-dangle */
import React from "react";
import PropTypes from "prop-types";
import axios from "../../axios";
import Nav from "../Landing/Nav";
import Error from "../Error";
import Spinner from "../../spinner/Spinner";
import profileholder from "../../images/profileholder.png";

class ProfileImg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      loading: false,
      imgholder: profileholder,
      errors: {
        file: ""
      }
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount() {
    const avatarExist = localStorage.getItem("avatarUrl");

    if (avatarExist) {
      this.setState({
        imgholder: avatarExist
      });
    } else {
      this.setState({
        imgholder: profileholder
      });
    }
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

  previewFile = e => {
    const preview = document.querySelector("img");
    const file = document.querySelector("input[type=file]").files[0];
    const reader = new FileReader();

    this.setState({
      file: e.target.files[0]
    });

    reader.addEventListener(
      "load",
      () => {
        // convert image file to base64 string
        preview.src = reader.result;
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  handleCancelClick = e => {
    const { history } = this.props;

    e.preventDefault();

    history.push("/profile");
    this.setState({ loading: false });
  };

  render() {
    const { errors, loading, imgholder } = this.state;

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
        <div>
          <Nav />
        </div>
        <span>{loading ? <Spinner /> : null}</span>
        <form onSubmit={this.onFormSubmit}>
          <h6>Profile Image Upload</h6>
          <img
            className="rounded-circle"
            src={imgholder}
            height="180"
            width="180"
            alt="preview..."
          />
          <br />
          <input type="file" name="avatar" onChange={e => this.previewFile(e)} />
          <small id="fileHelp" className="form-text text-muted">
            Please upload a valid image file. Size of image should not be more than 2MB.
          </small>
          <span style={errors.file ? dangerStyle : null}>
            <Error error={errors.file ? errors.file : null} />
          </span>
          <div className="btn-spacing">
            <button className="btn btn-sm btn-success upload-btn" type="submit">
              Upload
            </button>

            <button
              type="button"
              className="btn btn-sm btn-primary upload-btn"
              onClick={this.handleCancelClick}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}
ProfileImg.propTypes = {
  history: PropTypes.shape().isRequired
};

export default ProfileImg;
