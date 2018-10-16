const compiler = require("@webpack-contrib/test-utils");

import HtmlRendererWebpackPlugin, { Options } from "../";

const getWebpackConfig = (options: Options, config: Object = {}) =>
  Object.assign(
    {
      entry: ["./index.js"],
      plugins: [new HtmlRendererWebpackPlugin(options)]
    },
    config
  );

const renderer = () => "test";

describe("HtmlRendererWebpackPlugin", () => {
  it("should render with default renderer", async () => {
    const paths = ["/", "/foo", "/bar/"];
    const result = await compiler({}, getWebpackConfig({ paths }));
    expect(result.compilation.assets["index.html"]._value).toMatchSnapshot();
    expect(result.compilation.assets["foo.html"]._value).toMatchSnapshot();
    expect(
      result.compilation.assets["bar/index.html"]._value
    ).toMatchSnapshot();
    expect(result.compilation.assets["bar.html"]).toBeUndefined();
  });

  it("should render with custom renderer", async () => {
    const paths = ["/"];
    const result = await compiler({}, getWebpackConfig({ paths, renderer }));
    expect(result.compilation.assets["index.html"]._value).toMatchSnapshot();
  });
});
