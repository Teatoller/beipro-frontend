import React from "react";
import renderer from "react-test-renderer";
import { LoginForm } from "../LoginForm";

describe("LoginForm", () => {
  it.skip("snapshot renders correctly", () => {
    const component = renderer.create(<LoginForm />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
