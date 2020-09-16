import React from "react";
import renderer from "react-test-renderer";
import { FeedbackDisplay } from "../FeedbackDisplay";

describe("FeedbackDisplay", () => {
  it("snapshot renders correctly", () => {
    const component = renderer.create(<FeedbackDisplay />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
