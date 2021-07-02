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

<!-- ## [x.y.z] - YYYY-MM-DD -->
## Unreleased
<!-- ### Changed -->
### Added

- Added an optional `"syntax"` field to CSSCustomProperty to describe the property syntax using CSS Properties and Values API's syntax strings. Fixes
https://github.com/webcomponents/custom-elements-manifest/issues/68

<!-- ### Removed -->
### Fixed

- Fixed how custom element declarations extend class declarations. Previously CustomElementDeclaration didn't include CustomElement properties, and MixinDeclaration required some CustomElement properties. Added new CustomElementMixinDeclaration interface. Fixes https://github.com/webcomponents/custom-elements-manifest/issues/69

## [1.0.0] - 2021-06-10

Initial release

## [0.1.0] - 2021-02-12

Initial pre-release
