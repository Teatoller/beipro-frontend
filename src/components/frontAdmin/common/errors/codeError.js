import React from "react";
import Error from "../../../Error";

export function codeError(errors) {
  return (
    <span className="text-danger">
      <Error error={errors.code ? errors.code : null} />
    </span>
  );
}
