import React from "react";
import renderer from "react-test-renderer";
import { RegisterTextInput } from "../RegisterTextInput";

describe("RegisterTextInput", () => {
  it.skip("snapshot renders correctly", () => {
    const component = renderer.create(<RegisterTextInput />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
