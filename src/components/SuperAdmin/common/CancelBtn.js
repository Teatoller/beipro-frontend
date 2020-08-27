import React from "react";
import PropTypes from "prop-types";

const CancelBtn = props => {
  const { handleCancelClick } = props;
  return (
    <>
      <button type="button" className="btn btn-sm btn-primary m-2" onClick={handleCancelClick}>
        Cancel
      </button>
    </>
  );
};
CancelBtn.propTypes = {
  handleCancelClick: PropTypes.func.isRequired
};
export default CancelBtn;
