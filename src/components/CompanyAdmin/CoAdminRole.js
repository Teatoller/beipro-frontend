import React from "react";
import PropTypes from "prop-types";

const CoAdminRole = props => {
  const { onChange } = props;
  return (
    <select
      className="form-control form-control-sm"
      name="role"
      onChange={onChange}
      id="role"
      aria-describedby="roleInput"
      aria-required="true"
      aria-invalid="false"
    >
      <option value=" ">Select role</option>
      <option value="staff">Staff</option>
    </select>
  );
};
CoAdminRole.propTypes = {
  onChange: PropTypes.func.isRequired
};
export default CoAdminRole;
