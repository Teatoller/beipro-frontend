import React from "react";
import renderer from "react-test-renderer";
import { CompanyCreateDisplay } from "../CompanyCreateDisplay";

describe("CompanyCreateDisplay", () => {
  it("snapshot renders correctly", () => {
    const component = renderer.create(<CompanyCreateDisplay />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
