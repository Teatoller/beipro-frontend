import React from "react";
import Error from "../../../Error";

export function lpgError(errors) {
  return (
    <span className="text-danger">
      <Error error={errors.lpg ? errors.lpg : null} />
    </span>
  );
}
