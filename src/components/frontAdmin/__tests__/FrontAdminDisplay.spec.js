import React from "react";
import renderer from "react-test-renderer";
import { FrontAdminDisplay } from "../FrontAdminDisplay";

describe("FrontAdminDisplay", () => {
  it("snapshot renders correctly", () => {
    const component = renderer.create(<FrontAdminDisplay />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
