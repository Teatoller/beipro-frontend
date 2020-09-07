import React from "react";
import renderer from "react-test-renderer";
import { LoginExtra } from "../LoginExtra";

describe("LoginExtra", () => {
  it.skip("snapshot renders correctly", () => {
    const component = renderer.create(<LoginExtra />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
