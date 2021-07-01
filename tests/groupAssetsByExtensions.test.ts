import { sources } from "webpack";

import groupAssetsByExtensions from "../src/groupAssetsByExtensions";

const assets = {
  "5749aae7.js": new sources.RawSource("test"),
  "2ff13846.js": new sources.RawSource("test"),
  "5e6d94fc.css": new sources.RawSource("test"),
  "1e77c6d6.css": new sources.RawSource("test"),
  "7caf52ec.jpg": new sources.RawSource("test"),
  "676c1b7d.png": new sources.RawSource("test"),
  "85a81ee1": new sources.RawSource("test"),
};

describe("groupAssetsByExtensions", () => {
  it("should group assets by extensions", () => {
    const assetsByExtensions = groupAssetsByExtensions(assets);
    expect(assetsByExtensions).toMatchSnapshot();
  });
});
