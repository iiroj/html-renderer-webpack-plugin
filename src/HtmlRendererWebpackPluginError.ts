class HtmlRendererWebpackPluginError extends Error {
  public constructor(message: string) {
    super(`HtmlRendererWebpackPlugin Error:\n\n${message}`);
  }
}

export default HtmlRendererWebpackPluginError;
