import React from "react";
import renderer from "react-test-renderer";
import { ResetTextInput } from "../ResetTextInput";

describe("ResetTextInput", () => {
  it.skip("snapshot renders correctly", () => {
    const component = renderer.create(<ResetTextInput />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
