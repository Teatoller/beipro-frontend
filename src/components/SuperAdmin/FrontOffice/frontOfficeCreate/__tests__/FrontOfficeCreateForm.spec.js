import React from "react";
import renderer from "react-test-renderer";
import { FrontOfficeCreateForm } from "../FrontOfficeCreateForm";

describe("FrontOfficeCreateForm", () => {
  it("snapshot renders correctly", () => {
    const component = renderer.create(<FrontOfficeCreateForm />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
