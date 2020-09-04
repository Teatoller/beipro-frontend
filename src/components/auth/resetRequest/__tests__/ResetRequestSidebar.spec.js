import React from "react";
import renderer from "react-test-renderer";
import { ResetRequestSidebar } from "../ResetRequestSidebar";

describe("ResetRequestSidebar", () => {
  it("snapshot renders correctly", () => {
    const component = renderer.create(<ResetRequestSidebar />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
