import React from "react";
import renderer from "react-test-renderer";
import { FrontOfficeEditForm } from "../FrontOfficeEditForm";

describe("FrontOfficeEditForm", () => {
  it.skip("snapshot renders correctly", () => {
    const component = renderer.create(<FrontOfficeEditForm />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
