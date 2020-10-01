import React from "react";
import Error from "../../../Error";

export function keroseneError(errors) {
  return (
    <span className="text-danger">
      <Error error={errors.kerosene ? errors.kerosene : null} />
    </span>
  );
}
