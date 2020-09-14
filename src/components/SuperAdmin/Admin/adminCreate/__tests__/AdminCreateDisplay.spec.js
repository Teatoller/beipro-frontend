import React from "react";
import renderer from "react-test-renderer";
import { AdminCreateDisplay } from "../AdminCreateDisplay";

describe("AdminCreateDisplay", () => {
  it("snapshot renders correctly", () => {
    const component = renderer.create(<AdminCreateDisplay />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
