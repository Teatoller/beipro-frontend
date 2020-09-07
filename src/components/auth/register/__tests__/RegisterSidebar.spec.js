import React from "react";
import renderer from "react-test-renderer";
import { RegisterSidebar } from "../RegisterSidebar";

describe("RegisterSidebar", () => {
  it("snapshot renders correctly", () => {
    const component = renderer.create(<RegisterSidebar />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
