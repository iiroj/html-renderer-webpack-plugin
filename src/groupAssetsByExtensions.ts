import { RawSource } from "webpack-sources";

interface ObjectOfRawsource {
  [key: string]: RawSource;
}
interface ObjectOfArrays {
  [key: string]: string[];
}

export default (assets: ObjectOfRawsource) =>
  Object.keys(assets).reduce((accumulator: ObjectOfArrays, asset: string) => {
    const ext = asset.slice(((asset.lastIndexOf(".") - 1) >>> 0) + 2);

    if (!accumulator[ext]) {
      accumulator[ext] = [];
    }

    accumulator[ext].push(asset);

    return accumulator;
  }, {});
