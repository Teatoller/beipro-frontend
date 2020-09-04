import React from "react";
import renderer from "react-test-renderer";
import { ResetForm } from "../ResetForm";

describe("ResetForm", () => {
  it.skip("snapshot renders correctly", () => {
    const component = renderer.create(<ResetForm />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
