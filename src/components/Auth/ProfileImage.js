import React, { Component } from "react";

class ProfileImage extends Component {
  previewFile = () => {
    const preview = document.querySelector("img");
    const file = document.querySelector("input[type=file]").files[0];
    const reader = new FileReader();

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

  render() {
    return (
      <div>
        <img src="" height="200" alt="preview..." />
        <br />
        <input type="file" onChange={e => this.previewFile(e)} />
      </div>
    );
  }
}
export default ProfileImage;
