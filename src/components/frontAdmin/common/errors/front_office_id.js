/* eslint-disable camelcase */
import React from "react";
import Error from "../../../Error";

export function front_office_idError(errors) {
  return (
    <span className="text-danger">
      <Error error={errors.front_office_id ? errors.front_office_id : null} />
    </span>
  );
}
