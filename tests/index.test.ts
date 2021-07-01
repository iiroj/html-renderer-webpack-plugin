/* eslint-disable @typescript-eslint/no-var-requires */

import HtmlRendererWebpackPlugin from "../src/HtmlRendererWebpackPlugin";
import { Options } from "../src/types";
import webpack from "webpack";
import MemoryFileSystem from "memory-fs";

const getWebpackConfig = (options: Options, config: Record<string, any> = {}) =>
  Object.assign(
    {
      entry: ["./tests/__mocks__/index.js"],
      mode: "development" as const,
      plugins: [new HtmlRendererWebpackPlugin(options)],
    },
    config
  );

const renderer = () => "test";

describe("HtmlRendererWebpackPlugin", () => {
  let fs: MemoryFileSystem;

  beforeEach(() => {
    fs = new MemoryFileSystem();
  });

  const compile = (options: ReturnType<typeof getWebpackConfig>) =>
    new Promise<webpack.Stats["compilation"]>((resolve, reject) => {
      const compiler = webpack(options);

      compiler.inputFileSystem = fs;
      compiler.outputFileSystem = fs;

      compiler.run((error, stats) => {
        if (error) reject(error);
        resolve(stats!.compilation);
      });
    });

  const readFile = (name: string) =>
    fs.readFileSync(`${process.cwd()}/dist/${name}`).toString();

  it("should render with default renderer", async () => {
    const paths = ["/", "/foo", "/bar/"];

    await compile(getWebpackConfig({ paths }));

    expect(readFile("index.html")).toMatchSnapshot();
    expect(readFile("foo.html")).toMatchSnapshot();
    expect(readFile("bar/index.html")).toMatchSnapshot();

    expect(() => readFile("bar.html")).toThrowError("ENOENT");
  });

  it("should render with custom renderer", async () => {
    const paths = ["/"];
    await compile(getWebpackConfig({ paths, renderer }));
    expect(readFile("index.html")).toMatchSnapshot();
  });

  it("should require renderer from string", async () => {
    const paths = ["/"];

    await compile(
      getWebpackConfig({ paths, renderer: "./tests/__mocks__/renderer.js" })
    );

    expect(readFile("index.html")).toMatchSnapshot();
  });

  it("should pass options to renderer", async () => {
    const paths = ["/"];

    await compile(
      getWebpackConfig({
        options: { foo: "bar" },
        paths,
        renderer: "./tests/__mocks__/options-renderer.js",
      })
    );

    expect(readFile("index.html")).toMatchSnapshot();
  });
});
