/* eslint-disable camelcase */
import React from "react";
import Error from "../../../Error";

export function company_idError(errors) {
  return (
    <span className="text-danger">
      <Error error={errors.company_id ? errors.company_id : null} />
    </span>
  );
}
