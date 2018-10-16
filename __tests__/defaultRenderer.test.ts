import { RendererArgs, defaultRenderer } from "../index";

const assets = { js: ["5749aae7.js", "2ff13846.js"] };
const publicPath = "/";

describe("defaultRenderer", () => {
  it("should generate html", async () => {
    const html = await defaultRenderer({ assets, publicPath });
    expect(html).toMatchSnapshot();
  });
});
