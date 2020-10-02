/* eslint-disable camelcase */
import React from "react";
import Error from "../../../Error";

export function admin_idError(errors) {
  return (
    <span className="text-danger">
      <Error error={errors.admin_id ? errors.admin_id : null} />
    </span>
  );
}
