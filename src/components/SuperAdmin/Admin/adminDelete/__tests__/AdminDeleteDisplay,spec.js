import React from "react";
import renderer from "react-test-renderer";
import { AdminDeleteDisplay } from "../AdminDeleteDisplay";

describe("AdminDeleteDisplay", () => {
  it("snapshot renders correctly", () => {
    const component = renderer.create(<AdminDeleteDisplay />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
