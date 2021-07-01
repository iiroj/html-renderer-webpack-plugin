import { WebpackError } from "webpack";

class HtmlRendererWebpackPluginError extends WebpackError {
  public constructor(message: string) {
    super(`HtmlRendererWebpackPlugin Error:\n\n${message}`);
  }
}

export default HtmlRendererWebpackPluginError;
