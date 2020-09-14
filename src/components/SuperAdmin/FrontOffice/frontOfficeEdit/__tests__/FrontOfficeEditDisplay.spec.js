import React from "react";
import renderer from "react-test-renderer";
import { FrontOfficeEditDisplay } from "../FrontOfficeEditDisplay";

describe("FrontOfficeEditDisplay", () => {
  it("snapshot renders correctly", () => {
    const component = renderer.create(<FrontOfficeEditDisplay />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
