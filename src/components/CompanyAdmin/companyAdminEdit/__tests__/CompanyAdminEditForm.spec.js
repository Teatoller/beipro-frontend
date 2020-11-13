import React from "react";
import renderer from "react-test-renderer";
import { CompanyAdminEditForm } from "../CompanyAdminEditForm";

describe("CompanyAdminEditForm", () => {
  it.skip("snapshot renders correctly", () => {
    const component = renderer.create(<CompanyAdminEditForm />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
