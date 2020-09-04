import React from "react";
import renderer from "react-test-renderer";
import { ResetSidebar } from "../ResetSidebar";

describe("ResetSidebar", () => {
  it("snapshot renders correctly", () => {
    const component = renderer.create(<ResetSidebar />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
