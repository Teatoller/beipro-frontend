import renderer from "react-test-renderer";
import NewValue from "../NewValue";

describe("NewValue()", () => {
  it.skip("snapshot renders correctly", () => {
    const component = renderer.create(NewValue());
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
