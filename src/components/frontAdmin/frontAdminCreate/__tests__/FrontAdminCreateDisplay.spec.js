import React from "react";
import renderer from "react-test-renderer";
import { FrontAdminCreateDisplay } from "../FrontAdminCreateDisplay";

describe("FrontAdminCreateDisplay", () => {
  it("snapshot renders correctly", () => {
    const component = renderer.create(<FrontAdminCreateDisplay />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
