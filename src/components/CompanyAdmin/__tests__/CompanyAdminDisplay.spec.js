import React from "react";
import renderer from "react-test-renderer";
import { CompanyAdminDisplay } from "../CompanyAdminDisplay";

describe("CompanyAdminDisplay", () => {
  it("snapshot renders correctly", () => {
    const component = renderer.create(<CompanyAdminDisplay />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
