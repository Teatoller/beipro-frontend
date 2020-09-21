/* eslint-disable no-underscore-dangle */
import React from "react";
import PropTypes from "prop-types";
import { Nav } from "../../Landing/Nav";
import axios from "../../../axios";
import Error from "../../Error";
import { Spinner } from "../../../spinner/Spinner";

class ProfileImg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      loading: false,
      imgholder: "",
      errors: {
        file: ""
      }
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount() {
    const avatarExist = localStorage.getItem("avatarUrl");

    // if (avatarExist === !"profileholder.svg") {
    //   this.setState({
    //     imgholder: avatarExist
    //   });
    // } else if (avatarExist === "profileholder.svg") {
    //   const profileUrl = `./img/${avatarExist}`;
    //   this.setState({
    //     imgholder: profileUrl
    //   });
    // }

    if (avatarExist) {
      this.setState({
        imgholder: avatarExist
      });
    } else {
      const profileUrl = `./img/profileholder.svg`;
      this.setState({
        imgholder: profileUrl
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
      .post(`/profile`, formData, config)
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
    e.preventDefault();
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

    return (
      <div>
        <Nav />
        <div className=" container">
          <span>{loading ? <Spinner /> : null}</span>
          <form onSubmit={this.onFormSubmit}>
            <small>Image Upload</small>
            <div className="text-center">
              <img
                className="rounded-circle mx-auto d-block profile-img"
                src={imgholder}
                alt="preview..."
              />
            </div>
            <br />
            <div className="text-center">
              <input type="file" name="avatar" onChange={e => this.previewFile(e)} />
              <small className="form-text text-muted mx-auto">
                Please upload a valid image file. Size of image should not be more than 2MB.
              </small>
            </div>

            <span className={`text-danger ${errors.file ? "is-invalid" : ""}`}>
              <Error error={errors.file || null} />
            </span>

            <div className="row justify-content-center">
              <div className="col-1-sm m-2">
                <button className="btn btn-sm btn-success upload-btn" type="submit">
                  Upload
                </button>
              </div>
              <div className="col-1-sm m-2">
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={this.handleCancelClick}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
ProfileImg.propTypes = {
  history: PropTypes.shape().isRequired
};

export default ProfileImg;
