# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

<!--
   PRs should document their user-visible changes (if any) in the
   Unreleased section, uncommenting the header as necessary.
-->

<!-- ## [x.y.z] - YYYY-MM-DD -->
<!-- ## Unreleased -->
<!-- ### Changed -->
<!-- ### Added -->
<!-- ### Removed -->
<!-- ### Fixed -->

## Unreleased

### Fixed

- Clarified that all attributes of a `CustomElement` must be listed in the the `attributes` array, even those reflected from a `CustomElementField`.

## [2.0.0] - 2022-09-12

### Added

- Added an optional `"syntax"` field to CSSCustomProperty to describe the property syntax using CSS Properties and Values API's syntax strings. Fixes
  https://github.com/webcomponents/custom-elements-manifest/issues/68

- Added CustomElementField that extends ClassField with the ability to describe associated attributes. Fixes https://github.com/webcomponents/custom-elements-manifest/issues/36 ([#75](https://github.com/webcomponents/custom-elements-manifest/pull/75))

- Added a `"deprecated"` field to all declarations (functions and methods) ([#89](https://github.com/webcomponents/custom-elements-manifest/pull/89), [#105](https://github.com/webcomponents/custom-elements-manifest/pull/105))

- Added a `"rest"` field to parameters. ([#83](https://github.com/webcomponents/custom-elements-manifest/pull/83))

- Added an optional `summary` field to Function and Method return types. ([#109](https://github.com/webcomponents/custom-elements-manifest/pull/109))

### Fixed

- Fixed how custom element declarations extend class declarations. Previously CustomElementDeclaration didn't include CustomElement properties, and MixinDeclaration required some CustomElement properties. Added new CustomElementMixinDeclaration interface. Fixes https://github.com/webcomponents/custom-elements-manifest/issues/69 ([#103](https://github.com/webcomponents/custom-elements-manifest/pull/103))

- Clarified that module paths should point to importable files in the package. ([#104](https://github.com/webcomponents/custom-elements-manifest/pull/104))

## [1.0.0] - 2021-06-10

Initial release

## [0.1.0] - 2021-02-12

Initial pre-release
