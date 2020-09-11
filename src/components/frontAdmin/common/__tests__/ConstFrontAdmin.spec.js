import renderer from "react-test-renderer";
import ConstFrontAdmin from "../ConstFrontAdmin";

describe("ConstFrontAdmin()", () => {
  it("snapshot renders correctly", () => {
    const component = renderer.create(ConstFrontAdmin());
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
