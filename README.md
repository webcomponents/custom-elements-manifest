# custom-elements-json
A file format for describing custom elements

# Status

This effort is in the initial discussion and requirements-gathering phase. Please join the discussion in [Issues](https://github.com/webcomponents/custom-elements-json/issues).

# Overview

Many tools need some machine-readable descriptions of custom elements: IDEs, documentation viewers, linters, graphical design tools, etc.

There have been, and are currently, several efforts in this area:
- [Polymer Analyzer](https://github.com/Polymer/tools/tree/master/packages/analyzer)'s `analysis.json` file
- [VS Code Custom Data format](https://github.com/microsoft/vscode-custom-data/tree/master/samples/webcomponents)
- https://github.com/JetBrains/web-types

This repository is an effort to bring together tool owners to standardize on a common specification for a description format.

# Use Cases

## Editor Support

Developers using custom elements should be able to get full-featured IDE support including auto-completion, hover-documentation, unknown symbol warnings, etc. These features should be available in HTML files, and in various template syntaxes via template-specific tools.

## Documentation

Documentation viewers should be able to display all the relevant information about a custom element, such as its tag name, attributes, properties, definition module, CSS variables and parts, etc.

## Linting

Linters should be able to produce warnings based on custom element defintions, such as warning if unknown elements are used in HTML templates.
