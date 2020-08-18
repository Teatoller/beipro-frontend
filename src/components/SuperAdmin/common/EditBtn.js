import React from "react";
import PropTypes from "prop-types";

const EditBtn = props => {
  const { handleCancelClick } = props;
  return (
    <>
      <div className="col-1-sm m-2">
        <input className="btn btn-sm btn-success" type="submit" value="Change" />
      </div>
      <div className="col-1-sm m-2">
        <button type="button" className="btn btn-sm btn-primary" onClick={handleCancelClick}>
          Cancel
        </button>
      </div>
    </>
  );
};
EditBtn.propTypes = {
  handleCancelClick: PropTypes.func.isRequired
};
export default EditBtn;
