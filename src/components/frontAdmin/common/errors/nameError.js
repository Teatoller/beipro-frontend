import React from "react";
import Error from "../../../Error";

export function nameError(errors) {
  return (
    <span className="text-danger">
      <Error error={errors.name ? errors.name : null} />
    </span>
  );
}
