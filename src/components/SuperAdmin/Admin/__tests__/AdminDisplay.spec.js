import React from "react";
import renderer from "react-test-renderer";
import { AdminDisplay } from "../AdminDisplay";

describe("AdminDisplay", () => {
  it("snapshot renders correctly", () => {
    const component = renderer.create(<AdminDisplay />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
