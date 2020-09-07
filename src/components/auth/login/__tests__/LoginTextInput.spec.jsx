import React from "react";
import renderer from "react-test-renderer";
import { LoginTextInput } from "../LoginTextInput";

describe("LoginTextInput", () => {
  it("snapshot renders correctly", () => {
    const component = renderer.create(<LoginTextInput />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
