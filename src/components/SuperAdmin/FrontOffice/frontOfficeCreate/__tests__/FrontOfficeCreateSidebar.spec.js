import React from "react";
import renderer from "react-test-renderer";
import { FrontOfficeCreateSidebar } from "../FrontOfficeCreateSidebar";

describe("FrontOfficeCreateSidebar", () => {
  it("snapshot renders correctly", () => {
    const component = renderer.create(<FrontOfficeCreateSidebar />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
