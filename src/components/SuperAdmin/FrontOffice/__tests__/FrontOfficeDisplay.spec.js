import React from "react";
import renderer from "react-test-renderer";
import { FrontOfficeDisplay } from "../FrontOfficeDisplay";

describe("FrontOfficeDisplay", () => {
  it("snapshot renders correctly", () => {
    const component = renderer.create(<FrontOfficeDisplay />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
