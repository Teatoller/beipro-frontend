import React from "react";
import renderer from "react-test-renderer";
import { FeedbackDeleteDisplay } from "../FeedbackDeleteDisplay";

describe("FeedbackDeleteDisplay", () => {
  it("snapshot renders correctly", () => {
    const component = renderer.create(<FeedbackDeleteDisplay />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
