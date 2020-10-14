import React from "react";
import renderer from "react-test-renderer";
import { SpinnerIcon } from "../../components/statics/SpinnerIcon";

describe("SpinnerIcon", () => {
  it("snapshot renders correctly", () => {
    const component = renderer.create(<SpinnerIcon />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
