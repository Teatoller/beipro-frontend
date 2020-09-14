import React from "react";
import renderer from "react-test-renderer";
import { FrontOfficeDeleteDisplay } from "./FrontOfficeDeleteDisplay";

describe("FrontOfficeDeleteDisplay", () => {
  it("snapshot renders correctly", () => {
    const component = renderer.create(<FrontOfficeDeleteDisplay />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
