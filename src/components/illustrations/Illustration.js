/* eslint-disable max-len */
import React from "react";
import { NrbGraphs } from "./NrbGraphs";
import { MsaGraphs } from "./MsaGraphs";
import { KsmGraphs } from "./KsmGraphs";
import { NkrGraphs } from "./NkrGraphs";
import { EldGraphs } from "./EldGraphs";
import { Nav } from "../Landing/Nav";

export const Illustration = () => {
  return (
    <>
      <Nav />
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <NrbGraphs />
          </div>
          <div className="col-sm">
            <MsaGraphs />
          </div>
          <div className="w-100" />
          <div className="col-sm">
            <KsmGraphs />
          </div>
          <div className="col-sm">
            <NkrGraphs />
          </div>
          <div className="w-100" />
          <div className="col-sm">
            <EldGraphs />
          </div>
          <div className="col-sm" />
        </div>
      </div>
    </>
  );
};
export default Illustration;
