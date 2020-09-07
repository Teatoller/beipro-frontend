import React from "react";
import renderer from "react-test-renderer";
import { RegisterExtra } from "../RegisterExtra";

describe("RegisterExtra", () => {
  it.skip("snapshot renders correctly", () => {
    const component = renderer.create(<RegisterExtra />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
