/* eslint-disable @typescript-eslint/no-var-requires */

import HtmlRendererWebpackPlugin from "../src/HtmlRendererWebpackPlugin";
import { Options } from "../src/types";
import webpack from "webpack";

const getWebpackConfig = (options: Options, config: Record<string, any> = {}) =>
  Object.assign(
    {
      entry: ["./tests/__mocks__/index.js"],
      plugins: [new HtmlRendererWebpackPlugin(options)],
    },
    config
  );

const compiler = (options: ReturnType<typeof getWebpackConfig>) =>
  new Promise<webpack.Stats>((resolve) => {
    webpack(options, (_, stats) => resolve(stats));
  });

const renderer = () => "test";

describe("HtmlRendererWebpackPlugin", () => {
  it("should render with default renderer", async () => {
    const paths = ["/", "/foo", "/bar/"];
    const result = await compiler(getWebpackConfig({ paths }));
    expect(result.compilation.assets["index.html"]._value).toMatchSnapshot();
    expect(result.compilation.assets["foo.html"]._value).toMatchSnapshot();
    expect(
      result.compilation.assets["bar/index.html"]._value
    ).toMatchSnapshot();
    expect(result.compilation.assets["bar.html"]).toBeUndefined();
  });

  it("should render with custom renderer", async () => {
    const paths = ["/"];
    const result = await compiler(getWebpackConfig({ paths, renderer }));
    expect(result.compilation.assets["index.html"]._value).toMatchSnapshot();
  });

  it("should require renderer from string", async () => {
    const paths = ["/"];
    const result = await compiler(
      getWebpackConfig({ paths, renderer: "./tests/__mocks__/renderer.js" })
    );
    expect(result.compilation.assets["index.html"]._value).toMatchSnapshot();
  });

  it("should pass options to renderer", async () => {
    const paths = ["/"];
    const result = await compiler(
      getWebpackConfig({
        options: { foo: "bar" },
        paths,
        renderer: "./tests/__mocks__/options-renderer.js",
      })
    );
    expect(result.compilation.assets["index.html"]._value).toMatchSnapshot();
  });
});
