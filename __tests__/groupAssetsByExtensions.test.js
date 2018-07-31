const { RawSource } = require('webpack-sources');
const { groupAssetsByExtensions } = require('../index');

const assets = {
  '5749aae7.js': new RawSource({
    _value: 'test'
  }),
  '2ff13846.js': new RawSource({
    _value: 'test'
  }),
  '5e6d94fc.css': new RawSource({
    _value: 'test'
  }),
  '1e77c6d6.css': new RawSource({
    _value: 'test'
  }),
  '7caf52ec.jpg': new RawSource({
    _value: 'test'
  }),
  '676c1b7d.png': new RawSource({
    _value: 'test'
  }),
  '85a81ee1': new RawSource({
    _value: 'test'
  })
};

describe('groupAssetsByExtensions', () => {
  it('should group assets by extensions', () => {
    const assetsByExtensions = groupAssetsByExtensions(assets);
    expect(assetsByExtensions).toMatchSnapshot();
  });
});
