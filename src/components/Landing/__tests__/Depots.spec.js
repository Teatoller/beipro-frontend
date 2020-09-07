import React from "react";
import renderer from "react-test-renderer";
import { Depots } from "../Home/Depots";

describe("<Depots/>", () => {
  it.skip("snapshot renders correctly", () => {
    const component = renderer.create(<Depots />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
