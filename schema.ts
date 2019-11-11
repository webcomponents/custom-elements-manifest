/**
 * The top-level interface of a custom-elements.json file.
 *
 * custom-elements.json documents all the elements in a single npm package,
 * across all modules within the package. Elements may be exported from multiple
 * modules with re-exports, but as a rule, elements in this file should be
 * included once in the "canonical" module that they're exported from.
 */
export interface PackageDoc {
  version: number;

  /**
   * An array of the custom elements this package contains.
   */
  tags: TagDoc[];
}

export interface TagDoc {
  /**
   * The tag name of the web component
   */
  name: string;

  /**
   * Relative path to the js file which registers this web component
   */
  path?: string;

  /**
   * A markdown summary suitable for display in a listing.
   */
  summary?: string;

  /**
   * A markdown description of the module.
   */
  description?: string;

  /**
   * The attributes that this element is known to understand.
   */
  attributes?: AttributeDoc[];

  /**
   * The events that this element fires.
   */
  events?: EventDoc[];

  /**
   * The shadow dom content slots that this element accepts.
   */
  slots?: SlotDoc[];

  /**
   * Css Custom Properties that are used within this element.
   */
  cssCustomProperties?: CssCustomPropertyDoc[];

  /**
   * Css Custom Properties that are used within this element.
   */
  cssShadowParts?: CssShadowPartDoc[];

  /**
   * The properties that influence this element.
   */
  properties?: PropertyDoc[];

  /**
   * Methods that allow to interact with this element.
   */
  methods?: MethodDoc[];

  /**
   * Urls of demos that shows this element in various states.
   */
  demos?: DemoDoc[];
}

export interface FieldDoc {
  /**
   * The name of the html attribute.
   */
  name: string;

  /**
   * A markdown summary suitable for display in a listing.
   * TODO: restrictions on markdown/markup. ie, no headings, only inline
   *       formatting?
   */
  summary?: string;

  /**
   * A markdown description for the attribute.
   */
  description?: string;
}

export interface AttributeDoc extends FieldDoc {
  /**
   * The type that the attribute will be serialized/deserialized as.
   *
   * If the type is built-in, then it is a string, e.g. string|number|...,
   * If the type is define in a module then reference to it.
   */
  type?: Reference | string;

  /**
   * The default value of the attribute, if any.
   *
   * As attributes are always strings, this is the actual value, not a human
   * readable description.
   */
  defaultValue?: string;

  /**
   * The element may throw an error if this attribute is not provided
   */
  required?: boolean;
}

export interface EventDoc extends FieldDoc {
  /**
   * The type of the event object that's fired.
   *
   * If the event type is built-in, this is a string, e.g. `Event`,
   * `CustomEvent`, `KeyboardEvent`. If the event type is an event class defined
   * in a module, the reference to it.
   */
  type?: Reference | string;
}

export interface SlotDoc extends FieldDoc {}

export interface CssShadowPartDoc extends FieldDoc {}

export interface CssCustomPropertyDoc extends FieldDoc {
  /**
   * The default value of the Css Custom Property, if any.
   */
  defaultValue?: string;

  type?: CssPropertyType;
}

export interface PropertyDoc extends FieldDoc {
  privacy?: Privacy;

  /**
   * The default value of the property, if any.
   */
  defaultValue?: string;

  /**
   * The element may throw an error if this property is not provided
   */
  required?: boolean;

  /**
   * The type of the property
   *
   * If the type is built-in, then it is a string, e.g. string|number|...,
   * If the type is define in a module then reference to it.
   */
  type?: Reference | string;
}

export interface MethodDoc extends FieldDoc {
  privacy?: Privacy;
}

export interface DemoDoc extends FieldDoc {
  /**
   * Relative URL of the demo if it's published with the package. Absolute URL
   * if it's hosted.
   */
  url: string;
}

/**
 * Properties and modules can have a special privacy
 */
export type Privacy = "public" | "private" | "protected";

/**
 * For full list see https://drafts.css-houdini.org/css-properties-values-api/#supported-names
 */
export type CssPropertyType =
  | "length"
  | "number"
  | "percentage"
  | "length-percentage"
  | "color"
  | "image"
  | "url"
  | "integer"
  | "angle"
  | "time"
  | "resolution"
  | "transform-function"
  | "custom-ident";

/**
 * A reference to an export of a module.
 *
 * All references are required to be publicly accessible, so the canonical
 * representation of a reference it the export it's available from.
 */
export interface Reference {
  /**
   * Name of the type
   */
  name: string;

  /**
   * Bare module path to the file offering the named export
   * Can be translated to import { name } from import
   * @example
   * import { foo } from 'my-package/index.js';
   */
  import?: string;
}
