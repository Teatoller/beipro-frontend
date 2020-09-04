import React from "react";
import renderer from "react-test-renderer";
import { DepotUpArrow } from "../Home/DepotUpArrow";

describe("<DepotUpArrow/>", () => {
  it("snapshot renders correctly", () => {
    const component = renderer.create(<DepotUpArrow />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
