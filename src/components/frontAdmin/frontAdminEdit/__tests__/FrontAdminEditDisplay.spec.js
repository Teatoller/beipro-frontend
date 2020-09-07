import React from "react";
import renderer from "react-test-renderer";
import { FrontAdminEditDisplay } from "../FrontAdminEditDisplay";

describe("FrontAdminEditDisplay", () => {
  it("snapshot renders correctly", () => {
    const component = renderer.create(<FrontAdminEditDisplay />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
