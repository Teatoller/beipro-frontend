/* eslint-disable camelcase */
import React from "react";
import Error from "../../../Error";

export function locationError(errors) {
  return (
    <span className="text-danger">
      <Error error={errors.location ? errors.location : null} />
    </span>
  );
}
