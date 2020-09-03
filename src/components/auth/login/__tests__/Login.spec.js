describe("Login", () => {
  beforeEach(() => {
    console.log("Before Each");
  });

  beforeAll(() => {
    console.log("Before All");
  });
  afterEach(() => {
    console.log("After Each");
  });

  afterAll(() => {
    console.log("After All");
  });
  it("Should not regress", () => {
    expect(2 + 3).toEqual(5);
  });

  it("Should not fail", () => {
    expect(8 * 3).toEqual(24);
  });
});
