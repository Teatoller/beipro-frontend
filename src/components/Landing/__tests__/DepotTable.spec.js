import React from "react";
import renderer from "react-test-renderer";
import { DepotTable } from "../Home/DepotTable";

describe("<DepotTable/>", () => {
  it.skip("snapshot renders correctly", () => {
    const component = renderer.create(<DepotTable />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
