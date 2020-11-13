import React from "react";
import renderer from "react-test-renderer";
import { FrontAdminCreateForm } from "../FrontAdminCreateForm";

describe("FrontAdminCreateForm", () => {
  it.skip("snapshot renders correctly", () => {
    const component = renderer.create(<FrontAdminCreateForm />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
