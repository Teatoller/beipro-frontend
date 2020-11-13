import React from "react";
import renderer from "react-test-renderer";
import { CompanyCreateForm } from "../CompanyCreateForm";

describe("CompanyCreateForm", () => {
  it.skip("snapshot renders correctly", () => {
    const component = renderer.create(<CompanyCreateForm />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
