import React from "react";
import renderer from "react-test-renderer";
import { CompanyAdminEditDisplay } from "../CompanyAdminEditDisplay";

describe("CompanyAdminEditDisplay", () => {
  it("snapshot renders correctly", () => {
    const component = renderer.create(<CompanyAdminEditDisplay />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
