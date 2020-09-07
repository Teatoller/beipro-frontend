import React from "react";
import renderer from "react-test-renderer";
import { DepotMenu } from "../Home/DepotMenu";

describe("<DepotMenu/>", () => {
  it("snapshot renders correctly", () => {
    const component = renderer.create(<DepotMenu />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
