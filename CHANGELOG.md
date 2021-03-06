# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [6.1.1](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v6.1.0...v6.1.1) (2021-07-05)

## [6.1.0](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v6.0.0...v6.1.0) (2021-07-05)


### Features

* allow the paths options to be an async function ([f319e1b](https://github.com/iiroj/html-renderer-webpack-plugin/commit/f319e1b2c020ede49e1bf97cf91905e342659e6c))

## [6.0.0](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v5.3.0...v6.0.0) (2021-07-01)


### ⚠ BREAKING CHANGES

* This probably no longer works on webpack < 5

### Features

* update to webpack 5 ([8c33c31](https://github.com/iiroj/html-renderer-webpack-plugin/commit/8c33c31e3c841c6f62fd6d15de1bec3ab6bab1b0))

## [5.3.0](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v5.2.0...v5.3.0) (2020-11-01)


### Features

* use dynamic import to load renderer function to support esm modules ([a05f437](https://github.com/iiroj/html-renderer-webpack-plugin/commit/a05f43775cf922b1b234c41206a1cbfa538574c8))

## [5.2.0](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v5.1.3...v5.2.0) (2020-04-12)


### Features

* restore build with rollup, generate mjs module ([221f6e7](https://github.com/iiroj/html-renderer-webpack-plugin/commit/221f6e75cff0c6f2861171887eb2460b821a24ae))


### Bug Fixes

* restore require cache purge method ([7d82db8](https://github.com/iiroj/html-renderer-webpack-plugin/commit/7d82db86d5815187c08b868089ab80e1763813fc))

### [5.1.3](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v5.1.2...v5.1.3) (2020-03-14)

### [5.1.2](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v5.1.1...v5.1.2) (2019-12-30)

### [5.1.1](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v5.1.0...v5.1.1) (2019-11-24)

## [5.1.0](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v5.0.3...v5.1.0) (2019-11-14)


### Features

* add options object passed from plugin to renderer ([e800b42](https://github.com/iiroj/html-renderer-webpack-plugin/commit/e800b42))

### [5.0.3](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v5.0.2...v5.0.3) (2019-09-25)

### [5.0.2](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v5.0.1...v5.0.2) (2019-09-22)


### Bug Fixes

* add @types/node to fix duplicate identifier ([ec5b31f](https://github.com/iiroj/html-renderer-webpack-plugin/commit/ec5b31f))

### [5.0.1](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v5.0.0...v5.0.1) (2019-08-27)

## [5.0.0](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v4.0.24...v5.0.0) (2019-08-16)


### Features

* add support for requiring renderer from string ([de2b6c7](https://github.com/iiroj/html-renderer-webpack-plugin/commit/de2b6c7))
* use eslint instead of tslint ([7cc0c2d](https://github.com/iiroj/html-renderer-webpack-plugin/commit/7cc0c2d))
* use native tsc and remove rollup ([5ff9a90](https://github.com/iiroj/html-renderer-webpack-plugin/commit/5ff9a90))


### Tests

* use plain webpack compiler in test ([77fafb4](https://github.com/iiroj/html-renderer-webpack-plugin/commit/77fafb4))


### BREAKING CHANGES

* This removes the `hot` option as unnecessary. Hot Reloading is now supported by dynamically importing the renderer function before each render, and adding a file watcher to trigger webpack rebuild during watch mode. See [MIGRATING.md](./MIGRATING.md) for migrating instructions.



### [4.0.24](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v4.0.23...v4.0.24) (2019-07-17)



### [4.0.23](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v4.0.22...v4.0.23) (2019-07-11)



### [4.0.22](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v4.0.21...v4.0.22) (2019-07-07)


### Build System

* add husky, commitlint and lint-staged ([c543390](https://github.com/iiroj/html-renderer-webpack-plugin/commit/c543390))



### [4.0.21](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v4.0.20...v4.0.21) (2019-07-06)


### Build System

* suppress unneeded warning ([3d084f8](https://github.com/iiroj/html-renderer-webpack-plugin/commit/3d084f8))



### [4.0.20](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v4.0.19...v4.0.20) (2019-06-22)



### [4.0.19](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v4.0.18...v4.0.19) (2019-06-02)



### [4.0.18](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v4.0.17...v4.0.18) (2019-05-13)



## [4.0.17](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v4.0.16...v4.0.17) (2019-04-28)



## [4.0.16](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v4.0.15...v4.0.16) (2019-04-02)



## [4.0.15](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v4.0.14...v4.0.15) (2019-03-27)



## [4.0.14](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v4.0.13...v4.0.14) (2019-03-18)



## [4.0.13](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v4.0.12...v4.0.13) (2019-03-18)



## [4.0.12](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v4.0.11...v4.0.12) (2019-03-18)



## [4.0.11](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v4.0.10...v4.0.11) (2019-03-17)



## [4.0.10](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v4.0.9...v4.0.10) (2019-03-06)



## [4.0.9](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v4.0.8...v4.0.9) (2019-03-05)



## [4.0.8](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v4.0.7...v4.0.8) (2019-03-02)



## [4.0.7](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v4.0.6...v4.0.7) (2019-03-02)



## [4.0.6](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v4.0.5...v4.0.6) (2019-02-20)


### Bug Fixes

* include webpack-sources' types as dependencies ([d160a83](https://github.com/iiroj/html-renderer-webpack-plugin/commit/d160a83))



<a name="4.0.2"></a>
## [4.0.2](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v4.0.1...v4.0.2) (2019-02-09)


### Bug Fixes

* restore previous behaviour of require cache purging ([0352e83](https://github.com/iiroj/html-renderer-webpack-plugin/commit/0352e83))



<a name="4.0.1"></a>
## [4.0.1](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v4.0.0...v4.0.1) (2019-02-09)



<a name="4.0.0"></a>
# [4.0.0](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v3.1.12...v4.0.0) (2019-02-09)


### Bug Fixes

* `stats`’s type is basically `any` is since it’s the .toJson() return type ([7689197](https://github.com/iiroj/html-renderer-webpack-plugin/commit/7689197))


### Code Refactoring

* use watchRun hook to always invalidaterequire cache ([035b012](https://github.com/iiroj/html-renderer-webpack-plugin/commit/035b012))


### Features

* build using Rollup ([4f85148](https://github.com/iiroj/html-renderer-webpack-plugin/commit/4f85148))


### BREAKING CHANGES

* This replaces the “hotPath” option with “hot” boolean, by default true



<a name="3.1.12"></a>
## [3.1.12](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v3.1.11...v3.1.12) (2019-02-05)



<a name="3.1.11"></a>
## [3.1.11](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v3.1.10...v3.1.11) (2019-01-26)



<a name="3.1.10"></a>
## [3.1.10](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v3.1.9...v3.1.10) (2019-01-15)



<a name="3.1.9"></a>
## [3.1.9](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v3.1.8...v3.1.9) (2019-01-13)



<a name="3.1.8"></a>
## [3.1.8](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v3.1.7...v3.1.8) (2019-01-13)



<a name="3.1.7"></a>
## [3.1.7](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v3.1.6...v3.1.7) (2019-01-13)



<a name="3.1.6"></a>
## [3.1.6](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v3.1.5...v3.1.6) (2019-01-13)



<a name="3.1.5"></a>
## [3.1.5](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v3.1.4...v3.1.5) (2019-01-13)



<a name="3.1.4"></a>
## [3.1.4](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v3.1.3...v3.1.4) (2019-01-13)



<a name="3.1.3"></a>
## [3.1.3](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v3.1.2...v3.1.3) (2019-01-09)



<a name="3.1.2"></a>
## [3.1.2](https://github.com/iiroj/html-renderer-webpack-plugin/compare/v3.1.1...v3.1.2) (2019-01-09)



<a name="3.1.1"></a>
## [3.1.1](https://gitlab.com/iiroj/html-renderer-webpack-plugin/compare/v3.1.0...v3.1.1) (2019-01-03)



<a name="3.1.0"></a>
# [3.1.0](https://gitlab.com/iiroj/html-renderer-webpack-plugin/compare/v3.0.11...v3.1.0) (2018-12-27)


### Features

* add Webpack compilation assets to the renderer ([b906ac7](https://gitlab.com/iiroj/html-renderer-webpack-plugin/commit/b906ac7))



<a name="3.0.11"></a>
## [3.0.11](https://gitlab.com/iiroj/html-renderer-webpack-plugin/compare/v3.0.10...v3.0.11) (2018-12-26)



<a name="3.0.10"></a>
## [3.0.10](https://gitlab.com/iiroj/html-renderer-webpack-plugin/compare/v3.0.9...v3.0.10) (2018-11-30)



<a name="3.0.9"></a>
## [3.0.9](https://gitlab.com/iiroj/html-renderer-webpack-plugin/compare/v3.0.8...v3.0.9) (2018-11-27)


### Bug Fixes

* push entire error to webpack's error collection ([24915f4](https://gitlab.com/iiroj/html-renderer-webpack-plugin/commit/24915f4))



<a name="3.0.8"></a>
## [3.0.8](https://gitlab.com/iiroj/html-renderer-webpack-plugin/compare/v3.0.7...v3.0.8) (2018-11-20)


### Bug Fixes

* update lock file ([bd9b11f](https://gitlab.com/iiroj/html-renderer-webpack-plugin/commit/bd9b11f))



<a name="3.0.7"></a>
## [3.0.7](https://gitlab.com/iiroj/html-renderer-webpack-plugin/compare/v3.0.6...v3.0.7) (2018-11-20)



<a name="3.0.6"></a>
## [3.0.6](https://gitlab.com/iiroj/html-renderer-webpack-plugin/compare/v3.0.5...v3.0.6) (2018-11-10)



<a name="3.0.5"></a>
## [3.0.5](https://gitlab.com/iiroj/html-renderer-webpack-plugin/compare/v3.0.4...v3.0.5) (2018-10-29)



<a name="3.0.4"></a>
## [3.0.4](https://gitlab.com/iiroj/html-renderer-webpack-plugin/compare/v3.0.3...v3.0.4) (2018-10-16)


### Bug Fixes

* use emit instead of afterCompile hook to ensure assets exist ([838eb60](https://gitlab.com/iiroj/html-renderer-webpack-plugin/commit/838eb60))



<a name="3.0.3"></a>
## [3.0.3](https://gitlab.com/iiroj/html-renderer-webpack-plugin/compare/v3.0.2...v3.0.3) (2018-10-16)


### Bug Fixes

* Remove console.log ([ffea6aa](https://gitlab.com/iiroj/html-renderer-webpack-plugin/commit/ffea6aa))



<a name="3.0.2"></a>
## [3.0.2](https://gitlab.com/iiroj/html-renderer-webpack-plugin/compare/v3.0.1...v3.0.2) (2018-10-16)


### Bug Fixes

* Always run build before release ([2204a30](https://gitlab.com/iiroj/html-renderer-webpack-plugin/commit/2204a30))



<a name="3.0.1"></a>
## [3.0.1](https://gitlab.com/iiroj/html-renderer-webpack-plugin/compare/v3.0.0...v3.0.1) (2018-10-16)


### Bug Fixes

* Fix test typechecking ([78292bd](https://gitlab.com/iiroj/html-renderer-webpack-plugin/commit/78292bd))
* Remove built files from git ([3ee5e2c](https://gitlab.com/iiroj/html-renderer-webpack-plugin/commit/3ee5e2c))



<a name="3.0.0"></a>
# [3.0.0](https://gitlab.com/iiroj/html-renderer-webpack-plugin/compare/v2.0.0...v3.0.0) (2018-10-16)


### Features

* Rewrite plugin in TypeScript ([4bf17e3](https://gitlab.com/iiroj/html-renderer-webpack-plugin/commit/4bf17e3))


### BREAKING CHANGES

* This changes everything



<a name="2.0.0"></a>
# [2.0.0](https://gitlab.com/iiroj/html-renderer-webpack-plugin/compare/v1.3.3...v2.0.0) (2018-10-16)


### Bug Fixes

* renderer is an optional type ([d8b7c55](https://gitlab.com/iiroj/html-renderer-webpack-plugin/commit/d8b7c55))


### Features

* Run cache invalidation before compilation ([2463765](https://gitlab.com/iiroj/html-renderer-webpack-plugin/commit/2463765))


### BREAKING CHANGES

* This commit removes support with Webpack 3, and it’s now declared as a peer dependency. Support was never tested with Webpack 3.



<a name="1.3.3"></a>
## [1.3.3](https://gitlab.com/iiroj/html-renderer-webpack-plugin/compare/v1.3.2...v1.3.3) (2018-10-10)


### Bug Fixes

* Remove unused exports string ([c63ab2b](https://gitlab.com/iiroj/html-renderer-webpack-plugin/commit/c63ab2b))



<a name="1.3.2"></a>
## [1.3.2](https://gitlab.com/iiroj/html-renderer-webpack-plugin/compare/v1.3.1...v1.3.2) (2018-10-10)


### Bug Fixes

* Improve TypeScript typings ([0ae4865](https://gitlab.com/iiroj/html-renderer-webpack-plugin/commit/0ae4865))



<a name="1.3.1"></a>
## [1.3.1](https://gitlab.com/iiroj/html-renderer-webpack-plugin/compare/v1.3.0...v1.3.1) (2018-10-02)


### Bug Fixes

* Remove rogue console.log ([e49fddc](https://gitlab.com/iiroj/html-renderer-webpack-plugin/commit/e49fddc))



<a name="1.3.0"></a>
# [1.3.0](https://gitlab.com/iiroj/html-renderer-webpack-plugin/compare/v1.2.0...v1.3.0) (2018-10-02)


### Features

* Add better support for hot-reloading ([2fec34a](https://gitlab.com/iiroj/html-renderer-webpack-plugin/commit/2fec34a))



<a name="1.2.0"></a>
# [1.2.0](https://gitlab.com/iiroj/html-renderer-webpack-plugin/compare/v1.1.4...v1.2.0) (2018-09-28)


### Features

* Use afterCompile instead of emit ([9a203d9](https://gitlab.com/iiroj/html-renderer-webpack-plugin/commit/9a203d9))



<a name="1.1.4"></a>
## [1.1.4](https://gitlab.com/iiroj/html-renderer-webpack-plugin/compare/v1.1.3...v1.1.4) (2018-09-22)



<a name="1.1.3"></a>
## [1.1.3](https://gitlab.com/iiroj/html-renderer-webpack-plugin/compare/v1.1.2...v1.1.3) (2018-09-09)



<a name="1.1.2"></a>
## [1.1.2](https://gitlab.com/iiroj/html-renderer-webpack-plugin/compare/v1.1.1...v1.1.2) (2018-08-28)



<a name="1.1.1"></a>
## [1.1.1](https://gitlab.com/iiroj/html-renderer-webpack-plugin/compare/v1.1.0...v1.1.1) (2018-08-20)



<a name="1.1.0"></a>
# [1.1.0](https://gitlab.com/iiroj/html-renderer-webpack-plugin/compare/v1.0.5...v1.1.0) (2018-08-16)


### Features

* Use standard-version ([2f0ed94](https://gitlab.com/iiroj/html-renderer-webpack-plugin/commit/2f0ed94))



----

# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [1.0.5] - 2018-08-09
### Changed
- Update packages
- Update readme

## [1.0.4] - 2018-07-31
### Changed
- Update packages

## [1.0.3] - 2018-07-13
### Changed
- Update packages

## [1.0.2] - 2018-07-08
### Changed
- Update packages

## [1.0.1] - 2018-07-03
### Changed
- Use separate cached install stage in `.gitlab-ci.yml`
### Fixed
- Update missing entry to changelog

## [1.0.0] - 2018-07-03
### Added
- Add tests

## [0.1.2] - 2018-07-03
### Fixed
- Fix shields.io badge in Readme
### Removed
- Remove `webpack` from devDependencies

## [0.1.1] - 2018-07-02
### Changed
- Update packages

## [0.1.0] - 2018-06-24
### Changed
- Update packages

## [0.0.5] - 2018-06-22
### Removed
- Remove unused package.

## [0.0.4] - 2018-06-22
### Added
- Add npm badge to readme.

## [0.0.3] - 2018-06-22
### Fixed
- Fix typo in readme
### Removed
- Remove unused packages for now

## [0.0.2] - 2018-06-22
### Fixed
- Fix package.json repo names

## [0.0.1] - 2018-06-22
### Added
- Initial release
