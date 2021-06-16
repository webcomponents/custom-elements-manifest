# custom-elements-manifest
A file format for describing custom elements.

The schema is published as a [JSON Schema](https://json-schema.org/) file, in `schema.json`. The schema is written in TypeScript (see [schema.d.ts](https://github.com/webcomponents/custom-elements-manifest/blob/master/schema.d.ts)) and then compiled to JSON Schema.

# Usage

Install:

```sh
npm i -D custom-elements-manifest
```

Require the JSON Schema:

```ts
const customElementManifestSchema = require('custom-elements-manifest');
```

Import the TypeScript types:

```ts
import * as schema from 'custom-elements-manifest/schema';
```

## Referencing manifests from npm packages

In order to allow tools to find npm packages with custom element manifests without having to download package tarballs, packages should have a `"customElements"` field in their `package.json` that points to the manifest:

```json
{
  "name": "example-package",
  "customElements": "custom-elements.json",
}
```

## Schema Versioning

The schema has a `schemaVersion` field in the top-level object to facilitate
evolution of the schema. The schema follows [semver](https://semver.org/) versioning, the current schema version is `1.0.0`.

This version will not always match the npm package version, as some changes to the npm package might not have changes to the schema. We will publish a list of schema versions and their associated npm versions and git tags.

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
