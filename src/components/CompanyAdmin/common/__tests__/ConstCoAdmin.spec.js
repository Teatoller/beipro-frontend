import renderer from "react-test-renderer";
import ConstCoAdmin from "../ConstCoAdmin";

describe("ConstCoAdmin()", () => {
  it("snapshot renders correctly", () => {
    const component = renderer.create(ConstCoAdmin());
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
