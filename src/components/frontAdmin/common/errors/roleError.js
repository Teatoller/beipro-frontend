/* eslint-disable camelcase */
import React from "react";
import Error from "../../../Error";

export function roleError(errors) {
  return (
    <span className="text-danger">
      <Error error={errors.role ? errors.role : null} />
    </span>
  );
}
