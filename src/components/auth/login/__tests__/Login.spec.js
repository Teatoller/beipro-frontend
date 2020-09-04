import React from "react";
import renderer from "react-test-renderer";
import { Login } from "../Login";
// const { default: Login } = require("../Login");

describe("Login", () => {
  // beforeEach(() => {
  //   console.log("Before Each");
  // });

  // beforeAll(() => {
  //   console.log("Before All");
  // });
  // afterEach(() => {
  //   console.log("After Each");
  // });

  // afterAll(() => {
  //   console.log("After All");
  // });
  // it("Should not regress", () => {
  //   expect(2 + 3).toEqual(5);
  // });

  // it("Should not fail", () => {
  //   expect(8 * 3).toEqual(24);
  // });
  it.skip("snapshot renders correctly", () => {
    const component = renderer.create(<Login />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
