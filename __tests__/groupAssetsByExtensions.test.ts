import { RawSource } from "webpack-sources";
import { groupAssetsByExtensions } from "../";

const assets = {
  "5749aae7.js": new RawSource("test"),
  "2ff13846.js": new RawSource("test"),
  "5e6d94fc.css": new RawSource("test"),
  "1e77c6d6.css": new RawSource("test"),
  "7caf52ec.jpg": new RawSource("test"),
  "676c1b7d.png": new RawSource("test"),
  "85a81ee1": new RawSource("test")
};

describe("groupAssetsByExtensions", () => {
  it("should group assets by extensions", () => {
    const assetsByExtensions = groupAssetsByExtensions(assets);
    expect(assetsByExtensions).toMatchSnapshot();
  });
});
