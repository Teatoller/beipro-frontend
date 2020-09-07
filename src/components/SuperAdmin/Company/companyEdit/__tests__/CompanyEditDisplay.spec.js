import React from "react";
import renderer from "react-test-renderer";
import { CompanyEditDisplay } from "../CompanyEditDisplay";

describe("CompanyEditDisplay", () => {
  it("snapshot renders correctly", () => {
    const component = renderer.create(<CompanyEditDisplay />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
