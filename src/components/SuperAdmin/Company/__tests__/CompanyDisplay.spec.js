import React from "react";
import renderer from "react-test-renderer";
import { CompanyDisplay } from "../CompanyDisplay";

describe("CompanyDisplay", () => {
  it("snapshot renders correctly", () => {
    const component = renderer.create(<CompanyDisplay />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
