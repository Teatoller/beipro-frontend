/* eslint-disable camelcase */
import React from "react";
import Error from "../../../Error";

export function staff_idError(errors) {
  return (
    <span className="text-danger">
      <Error error={errors.staff_id ? errors.staff_id : null} />
    </span>
  );
}
