const { filenameFromPath } = require('../index');

const paths = ['/', '/foo', '/bar/'];

describe('filenameFromPath', () => {
  it('should generate filenames from paths', () => {
    const filenames = paths.map(path => filenameFromPath(path));
    expect(filenames).toMatchSnapshot();
  });
});
