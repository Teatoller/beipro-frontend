import React from "react";
import Error from "../../../Error";

export function idoError(errors) {
  return (
    <span className="text-danger">
      <Error error={errors.ido ? errors.ido : null} />
    </span>
  );
}
