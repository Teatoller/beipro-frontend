import React from "react";
import renderer from "react-test-renderer";
import { DepotPagination } from "../DepotPagination";

describe("DepotPagination", () => {
  it.skip("snapshot renders correctly", () => {
    const component = renderer.create(<DepotPagination />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
