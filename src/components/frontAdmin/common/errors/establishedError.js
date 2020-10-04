import React from "react";
import Error from "../../../Error";

export function establishedError(errors) {
  return (
    <span className="text-danger">
      <Error error={errors.established ? errors.established : null} />
    </span>
  );
}
