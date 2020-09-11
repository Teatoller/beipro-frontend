import React from "react";
import renderer from "react-test-renderer";
import { CompanyDeleteDisplay } from "../CompanyDeleteDisplay";

describe("CompanyDeleteDisplay", () => {
  it("snapshot renders correctly", () => {
    const component = renderer.create(<CompanyDeleteDisplay />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
