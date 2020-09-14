import React from "react";
import renderer from "react-test-renderer";
import { AdminRole } from "../AdminRole";

describe("AdminRole()", () => {
  it("snapshot renders correctly", () => {
    const component = renderer.create(<AdminRole />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
