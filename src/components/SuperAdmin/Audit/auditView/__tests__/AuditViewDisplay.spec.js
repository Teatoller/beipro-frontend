import React from "react";
import renderer from "react-test-renderer";
import { AuditViewDisplay } from "../AuditViewDisplay";

describe("AuditViewDisplay", () => {
  it("snapshot renders correctly", () => {
    const component = renderer.create(<AuditViewDisplay />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
