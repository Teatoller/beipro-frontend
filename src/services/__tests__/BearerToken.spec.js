import renderer from "react-test-renderer";
import BearerToken from "../BearerToken";

describe("BearerToken()", () => {
  it.skip("snapshot renders correctly", () => {
    const component = renderer.create(BearerToken());
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
