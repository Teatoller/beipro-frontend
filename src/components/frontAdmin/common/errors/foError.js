import React from "react";
import Error from "../../../Error";

export function foError(errors) {
  return (
    <span className="text-danger">
      <Error error={errors.fo ? errors.fo : null} />
    </span>
  );
}
