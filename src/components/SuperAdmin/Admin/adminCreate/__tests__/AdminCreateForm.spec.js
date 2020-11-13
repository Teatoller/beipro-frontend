import React from "react";
import renderer from "react-test-renderer";
import { AdminCreateForm } from "../AdminCreateForm";

describe("AdminCreateForm", () => {
  it.skip("snapshot renders correctly", () => {
    const component = renderer.create(<AdminCreateForm />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
