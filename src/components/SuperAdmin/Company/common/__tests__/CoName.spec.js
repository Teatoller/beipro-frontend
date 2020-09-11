import React from "react";
import renderer from "react-test-renderer";
import { CoName } from "../CoName";

describe("CoName", () => {
  it("snapshot renders correctly", () => {
    const component = renderer.create(<CoName />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
