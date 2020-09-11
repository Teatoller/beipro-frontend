import React from "react";
import renderer from "react-test-renderer";
import { CoAdminRole } from "../CoAdminRole";

describe("CoAdminRole()", () => {
  it("snapshot renders correctly", () => {
    const component = renderer.create(<CoAdminRole />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
