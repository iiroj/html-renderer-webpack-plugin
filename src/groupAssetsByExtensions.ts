import { RawSource } from "webpack-sources";

type ObjectOfRawsource = {
  [key: string]: RawSource;
};

type ObjectOfArrays = {
  [key: string]: string[];
};

const groupAssetsByExtensions = (assets: ObjectOfRawsource): ObjectOfArrays =>
  Object.keys(assets).reduce((accumulator: ObjectOfArrays, asset: string) => {
    const ext = asset.slice(((asset.lastIndexOf(".") - 1) >>> 0) + 2);

    if (!accumulator[ext]) {
      accumulator[ext] = [];
    }

    accumulator[ext].push(asset);

    return accumulator;
  }, {});

export default groupAssetsByExtensions;
