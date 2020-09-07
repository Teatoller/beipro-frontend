import React from "react";
import renderer from "react-test-renderer";
import { FrontAdminDeleteDisplay } from "../FrontAdminDeleteDisplay";

describe("FrontAdminDeleteDisplay", () => {
  it("snapshot renders correctly", () => {
    const component = renderer.create(<FrontAdminDeleteDisplay />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
