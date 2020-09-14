import React from "react";
import PropTypes from "prop-types";

export const AdminRole = props => {
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
      <option value="admin">Admin</option>
    </select>
  );
};
AdminRole.propTypes = {
  onChange: PropTypes.func.isRequired
};
export default AdminRole;
