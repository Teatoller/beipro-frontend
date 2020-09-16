import React from "react";
import renderer from "react-test-renderer";
import { AuditVwDisplay } from "../AuditVwDisplay";

describe("AuditVwDisplay", () => {
  it("snapshot renders correctly", () => {
    const component = renderer.create(<AuditVwDisplay />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
