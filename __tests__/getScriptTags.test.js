const { getScriptTags } = require('../index');

const js = ['5749aae7.js', '2ff13846.js'];

it('should generate relative script tags', () => {
  const scriptTags = getScriptTags(undefined, js);
  expect(scriptTags).toMatchSnapshot();
});

it('should generate absolute script tags 1', () => {
  const scriptTags = getScriptTags('/', js);
  expect(scriptTags).toMatchSnapshot();
});

it('should generate absolute script tags 2', () => {
  const scriptTags = getScriptTags('/foo/', js);
  expect(scriptTags).toMatchSnapshot();
});

it('should append / to path if needed', () => {
  const scriptTags = getScriptTags('/bar', js);
  expect(scriptTags).toMatchSnapshot();
});
