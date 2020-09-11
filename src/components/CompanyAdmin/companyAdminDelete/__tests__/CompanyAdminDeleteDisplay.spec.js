import React from "react";
import renderer from "react-test-renderer";
import { CompanyAdminDeleteDisplay } from "../CompanyAdminDeleteDisplay";

describe("CompanyAdminDeleteDisplay", () => {
  it("snapshot renders correctly", () => {
    const component = renderer.create(<CompanyAdminDeleteDisplay />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
