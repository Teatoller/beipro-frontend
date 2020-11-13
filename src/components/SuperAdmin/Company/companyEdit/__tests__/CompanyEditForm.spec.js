import React from "react";
import renderer from "react-test-renderer";
import { CompanyEditForm } from "../CompanyEditForm";

describe("CompanyEditForm", () => {
  it.skip("snapshot renders correctly", () => {
    const component = renderer.create(<CompanyEditForm />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
