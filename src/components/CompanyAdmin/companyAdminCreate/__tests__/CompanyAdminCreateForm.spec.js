import React from "react";
import renderer from "react-test-renderer";
import { CompanyAdminCreateForm } from "../CompanyAdminCreateForm";

describe("CompanyAdminCreateForm", () => {
  it.skip("snapshot renders correctly", () => {
    const component = renderer.create(<CompanyAdminCreateForm />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
