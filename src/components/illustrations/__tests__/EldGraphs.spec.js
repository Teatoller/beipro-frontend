import React from "react";
import renderer from "react-test-renderer";
import { EldGraphs } from "../EldGraphs";

describe("EldGraphs", () => {
  it.skip("snapshot renders correctly", () => {
    const component = renderer.create(<EldGraphs />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
