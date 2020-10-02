import React from "react";
import renderer from "react-test-renderer";
import { ResetRequestTextInput } from "../ResetRequestTextInput";

describe("ResetRequestTextInput", () => {
  it.skip("snapshot renders correctly", () => {
    const component = renderer.create(<ResetRequestTextInput />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
