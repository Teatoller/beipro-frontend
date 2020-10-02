import React from "react";
import Error from "../../Error";

export function firstnameError(errors) {
  return (
    <span className="text-danger">
      <Error error={errors.firstname ? errors.firstname : null} />
    </span>
  );
}
