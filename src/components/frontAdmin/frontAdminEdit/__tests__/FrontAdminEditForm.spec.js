import React from "react";
import renderer from "react-test-renderer";
import { FrontAdminEditForm } from "../FrontAdminEditForm";

describe("FrontAdminEditForm", () => {
  it.skip("snapshot renders correctly", () => {
    const component = renderer.create(<FrontAdminEditForm />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
