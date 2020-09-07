import React from "react";
import renderer from "react-test-renderer";
import { CompanyAdminCreateDisplay } from "../CompanyAdminCreateDisplay";

describe("CompanyAdminCreateDisplay", () => {
  it("snapshot renders correctly", () => {
    const component = renderer.create(<CompanyAdminCreateDisplay />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
