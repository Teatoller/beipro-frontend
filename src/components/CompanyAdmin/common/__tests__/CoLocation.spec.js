import React from "react";
import renderer from "react-test-renderer";
import { CoLocation } from "../CoLocation";

describe("CoLocation()", () => {
  it("snapshot renders correctly", () => {
    const component = renderer.create(<CoLocation />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
