# custom-elements-manifest
A file format for describing custom elements.

# Status

This schema is in a pre-release phase. We are gathering feedback from tool
and web component authors. Please file [issues](https://github.com/webcomponents/custom-elements-manifest/issues) to give feedback.

# Motivation

Many tools need some machine-readable descriptions of custom elements: IDEs, documentation viewers, linters, graphical design tools, etc.

There have been several efforts in this area, including:
- [Polymer Analyzer](https://github.com/Polymer/tools/tree/master/packages/analyzer)'s `analysis.json` file
- [VS Code Custom Data format](https://github.com/microsoft/vscode-custom-data/tree/master/samples/webcomponents)
- https://github.com/JetBrains/web-types

This repository is an effort to bring together tool owners to standardize on a common specification for a description format.

# Use Cases

## Editor Support

Developers using custom elements should be able to get full-featured IDE support including auto-completion, hover-documentation, unknown symbol warnings, etc. These features should be available in HTML files, and in various template syntaxes via template-specific tools.

## Documentation and demos

Documentation viewers should be able to display all the relevant information about a custom element, such as its tag name, attributes, properties, definition module, CSS variables and parts, etc.

Using a custom-elements manifest, it would be easy to generate or display demos for your component using tools such as [api-viewer-element](https://github.com/web-padawan/api-viewer-element), or automatically generate [Storybook](https://storybook.js.org/) knobs for your components.

## Linting

Linters should be able to produce warnings based on custom element defintions, such as warning if unknown elements are used in HTML templates.

## Framework Integration

React currently is the only major framework where [custom elements require some special handling](https://custom-elements-everywhere.com/). React will pass all data to a custom element in the form of HTML attributes, and cannot listen for DOM events coming from Custom Elements without the use of a workaround.

The solution for this is to create a wrapper React component that handles these things. Using a custom elements manifest, creation of these wrapper components could be automated.

Some component libraries like [Fast](https://www.fast.design/docs/integrations/react) or [Shoelace](https://shoelace.style/getting-started/usage?id=react) provide specific instructions on how to integrate with certain frameworks. Automating this integration layer could make development easier for both authors of component libraries, but also for consumers of libraries.

## Cataloging

A major use-case of custom elements manifests is that they allow us to reliably detect NPM packages that for certain contain custom elements. These packages could be stored, and displayed on a custom elements catalog, effectively a potential reboot of [webcomponents.org](https://www.webcomponents.org/). This catalog would be able to show rich demos and documentation of the custom elements contained in a package, by importing its components from a CDN like [unpkg](https://unpkg.com/), and its custom elements manifest.

## Testing

Tooling would be able to detect whether or not the public API of a custom element has changed, based on a snapshot of the current custom elements manifest file to decide the impact of an update, and potentially prevent breaking API change in patch versions.
