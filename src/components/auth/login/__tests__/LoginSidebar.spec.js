import React from "react";
import renderer from "react-test-renderer";
import { LoginSidebar } from "../LoginSidebar";

describe("LoginSidebar", () => {
  it("snapshot renders correctly", () => {
    const component = renderer.create(<LoginSidebar />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
