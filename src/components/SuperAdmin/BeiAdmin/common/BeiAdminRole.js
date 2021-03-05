import React from "react";
import PropTypes from "prop-types";

export const BeiAdminRole = props => {
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
      <option value="beistaff">Beipro staff</option>
    </select>
  );
};
BeiAdminRole.propTypes = {
  onChange: PropTypes.func.isRequired
};
export default BeiAdminRole;
