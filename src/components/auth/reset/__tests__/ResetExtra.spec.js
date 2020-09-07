import React from "react";
import renderer from "react-test-renderer";
import { ResetExtra } from "../ResetExtra";

describe("ResetExtra", () => {
  it.skip("snapshot renders correctly", () => {
    const component = renderer.create(<ResetExtra />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
