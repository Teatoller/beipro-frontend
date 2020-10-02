import React from "react";
import Error from "../../Error";

export function emailError(errors) {
  return (
    <span className="text-danger">
      <Error error={errors.email ? errors.email : null} />
    </span>
  );
}
