import React from "react";
import Error from "../../../Error";

export function petrolError(errors) {
  return (
    <span className="text-danger">
      <Error error={errors.petrol ? errors.petrol : null} />
    </span>
  );
}
