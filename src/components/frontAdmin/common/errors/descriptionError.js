import React from "react";
import Error from "../../../Error";

export function descriptionError(errors) {
  return (
    <span className="text-danger">
      <Error error={errors.description ? errors.description : null} />
    </span>
  );
}
