# custom-elements.json
A file format for describing custom elements.

Its primary goal is to offer an overview of the full public API of multiple custom elements.

Key points for web components are:
- properties
- attributes
- events
- methods
- [slots](https://html.spec.whatwg.org/multipage/scripting.html#the-slot-element) 
- [CSS custom properties](https://drafts.csswg.org/css-variables/#defining-variables)
- [CSS Shadow parts](https://www.w3.org/TR/css-shadow-parts-1/)

## Intro

Many tools need some machine-readable descriptions of custom elements: IDEs, documentation viewers, linters, graphical design tools, etc.

There have been, and are currently, several efforts in this area:
- [Polymer Analyzer](https://github.com/Polymer/tools/tree/master/packages/analyzer)'s `analysis.json` file
- [`custom-elements.json`](https://github.com/octref/web-components-examples)
- https://github.com/JetBrains/web-types

This repository is an effort to bring together tool owners to standardize on a common specification for a description format.

Please join the discussion in [Issues](https://github.com/webcomponents/custom-elements-json/issues).

## Versioning

The `custom-elements.json` follows a version number to allow for a gradual upgrade process.

- [Version 2](#version-2)
- [Version 1](#version-1)

### Version 2

The main goal if this version is to address all key points of web-components.
It shall serve as a starting point for adoption in tools and for web component authors.

It is fully based on [Version 1](#version-1). 
It adds all mentioned key points for web components.
It on purpose does not define a type system. This is left to the next iteration.
Therefore "type" should be seen as a type hint which can be presented to the end-user as documentation.

Following is an example which shows all available capabilities.

```json
{
  "version": 2,
  "tags": [
    {
      "name": "demo-wc-card",
      "description": "This is a container looking like a card with a back and front side you can switch",
      "attributes": [
        {
          "name": "header",
          "type": "string",
          "description": "Shown at the top of the card",
          "default": "Your Message",
          "required": true
        }
      ],
      "properties": [
        {
          "name": "header",
          "type": "string",
          "description": "Shown at the top of the card",
          "default": "Your Message",
          "required": true
        }
      ],
      "events": [
        {
          "name": "side-changed",
          "description": "Fires whenever it switches between front/back"
        }
      ],
      "methods": [
        {
          "name": "toggle",
          "description": "Switches between front and back card"
        }
      ],      
      "slots": [
        {
          "name": "",
          "description": "Content inside the card which displayed on the front page"
        }
      ],
      "cssProperties": [
        {
          "name": "--demo-wc-card-front-color",
          "description": "Font color for the front",
          "type": "color"
        }
      ],
      "cssShadowParts": [
        {
          "name": "header",
          "description": "The ",
        }
      ]
    }
  ]
}
```
#### Changelog

- Added attribute details default [any]
  - If no value is provided for the property this default value will be used as a fallback
- Added attribute details required [boolean]
  - This property is required and the web component may throw an error if not provided
- Added attribute details type [string]
  - A type hint to indicate to the end-user what values can be provided
- Added tag properties
  - Lists all available properties of a web component
- Added tag property details with name, description, default, required, type
  - See attributes
- Added tag methods with name, description
  - Lists all methods or a web component
  - Does not define parameters or type of parameters (this is for a later iteration) - for now, you can add this information to the description
- Added tag events with name, description
  - Lists all events the custom elements fires via `this.dispatchEvent()`
- Added tag slots with name, description
  - Lists all [slots](https://html.spec.whatwg.org/multipage/scripting.html#the-slot-element) in the shadow dom like `<slot name="header"></slot>`
  - The default slot is represented via an empty name `<slot></slot>`
- Added tag cssProperties with name, description, type
  - Lists all [CSS custom properties](https://drafts.csswg.org/css-variables/#defining-variables) that are used within the style of a web component like `--my-css-property-name`
  - Type are aligned with [Houdini's CSS Properties and Values API](https://drafts.css-houdini.org/css-properties-values-api)
- Added tag cssShadowParts with name, description
  - Lists all [CSS Shadow parts](https://www.w3.org/TR/css-shadow-parts-1/)


## Use Cases

### Editor Support

Developers using custom elements should be able to get full-featured IDE support including auto-completion, hover-documentation, unknown symbol warnings, etc. These features should be available in HTML files, and in various template syntaxes via template-specific tools.

### Documentation

Documentation viewers should be able to display all the relevant information about a custom element, such as its tag name, attributes, properties, definition module, CSS variables and parts, etc.

### Documentation Playground

With full information about the public api of a web component tools can provide UIs to trigger/execute these apis.

### Linting

Linters should be able to produce warnings based on custom element definitions, such as warning if unknown elements are used in HTML templates.

### Web Component Catalog

A web component catalog can index packages based on the information that is available in a `custom-elements.json`.

### Browser extensions

A browser extension can list all used web components on a page and then query a catalog to see if meta-information is available.
If so links to documentation, source, or ways of interacting with the elements api can be provided.

## Version history

### Version 1

Currently implemented in VS Code. See the details for [vscode-html-languageservice](https://github.com/microsoft/vscode-html-languageservice/blob/master/docs/customData.md#custom-data-for-html-language-service).

```json
{
  "version": 1,
  "tags": [
    {
      "name": "demo-wc-card",
      "description": "This is a container looking like a card with a back and front side you can switch",
      "attributes": [
        {
          "name": "current-side",
          "description": "Defines which side of the card to show. Possible values are A or B",
          "values": [
            {
              "name": "A"
            },
            {
              "name": "B"
            }
          ]
        },
      ]
    }
  ]
}
```

## Existing tools

- [web-component-analyzer](https://github.com/runem/web-component-analyzer) Automatically generates a `custom-elements.json` by analyzing your code
- [@storybook/web-components addon docs](https://github.com/storybookjs/storybook/tree/next/addons/docs/web-components#custom-elementsjson) Displays an api table for your components inside the Storybook UI
- [api-viewer](https://github.com/web-padawan/api-viewer-element) Displays public api & playground for your web component
- [@open-wc/demoing-storybook knobs for storybook](https://open-wc.org/demoing-storybook/?path=/docs/decorators-withwebcomponentknobs--example-output) Automatically generates knobs for web components in your storybook
- [Open Web Components Catalog](https://github.com/open-wc/catalog) WIP Catalog of web components where you get added automatically if you have a `custom-element.json`

