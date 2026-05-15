# `x-` Field Conventions for Custom Elements Manifest

This document establishes conventions for community `x-` fields in Custom Elements Manifest (CEM). The CEM spec allows any `x-` prefixed field on declarations — these fields are validated by the schema but carry tool-specific metadata for SSR/SSG engines, registries, and other tooling.

## Why `x-` fields?

Different tools (SSR engines, registries, IDEs) need metadata that isn't in the core CEM schema yet. Rather than each tool inventing its own parallel format, shared `x-` field conventions allow:

1. **Interoperability** — any tool can read `x-render-dependencies` from any CEM output
2. **Gradual standardization** — proven `x-` fields can be proposed for inclusion in the schema
3. **Experimentation** — new ideas can be tested without waiting for schema changes

## Naming rules

- **Prefix**: All community fields must use the `x-` prefix
- **Format**: `x-` + lowercase-hyphen name (e.g., `x-render-dependencies`, not `x-renderDeps`)
- **JSON-serializable**: Field values must be valid JSON (strings, numbers, booleans, arrays, objects)
- **No tool-specific prefixes**: Use `x-field-name`, not `x-toolname-field-name`. If a field is useful to one tool, it's likely useful to others.

## Auto-detection vs manual declaration

Some `x-` fields can be auto-detected by the analyzer from source code. Others require manual declaration. Fields should document:

- **Auto-detectable**: The analyzer can infer the value. Manual declaration overrides auto-detection.
- **Manual only**: The developer must declare the value. No reliable auto-detection method exists.

## Deprecation path

If an `x-` field is adopted into the CEM schema as a standard field:

1. The `x-` version continues to work (the schema allows unknown fields)
2. Tools should read both the standard field and the `x-` field, preferring the standard field
3. The `x-` field convention document marks it as "adopted into schema as `fieldName`"
4. After a reasonable transition period (e.g., one major version of the schema), the `x-` field can be removed from the convention document

---

## Recommended `x-` fields

### `x-render-dependencies`

**Type**: `string[]` — array of Custom Element tag names

**Purpose**: Tag names that must be registered **before** this component can be correctly rendered.

When an SSR/SSG engine renders nested Custom Elements via Declarative Shadow DOM (DSD), it must resolve components in topological order. If `<my-card>` renders `<my-button>` in its shadow DOM, `<my-button>` must be registered first — otherwise the nested element is silently skipped, producing broken output.

**Direct dependencies only**: List only tags that appear in the component's own shadow DOM output. Transitive dependencies are resolved by the consumer from the dependency graph. This keeps the manifest simple and avoids stale transitive data.

**Auto-detectable**: Yes. The analyzer can scan the component's `render()` output HTML for custom element tag names:

```regex
<([a-z][a-z0-9]*-[a-z0-9-]+)[\s>\/]
```

For Lit components, the analyzer can also inspect `static styles` and template literals. Manual declaration overrides auto-detection.

**Example**:

```json
{
  "kind": "class",
  "name": "MyCard",
  "tagName": "my-card",
  "attributes": [
    { "name": "title", "type": { "text": "string" } }
  ],
  "slots": [
    { "name": "" },
    { "name": "footer" }
  ],
  "x-render-dependencies": ["my-button", "my-icon"]
}
```

This tells an SSR engine: *"Before rendering `<my-card>`, ensure `<my-button>` and `<my-icon>` are registered."*

**Consumer responsibilities**:

1. Build a dependency graph from all components' `x-render-dependencies`
2. Resolve transitive dependencies (e.g., if `<my-button>` also depends on `<my-ripple>`, include `<my-ripple>`)
3. Detect circular dependencies and report an error
4. Use topological sort to determine registration order

**Use cases**:

- **SSR engines**: Pre-compute registration order before rendering, instead of runtime trial-and-error
- **WC registry hubs**: Auto-resolve dependency chains when installing a component
- **Tree-shaking**: Only register components that are actually needed for a given page
- **IDE support**: Warn developers when a component's dependencies are missing from the page

**Working implementation**: [LessJS](https://github.com/lessjs-run/lessjs) uses this concept in production. The [`render-nested.ts`](https://github.com/lessjs-run/lessjs/blob/main/packages/core/src/render-nested.ts) module performs bottom-up recursive rendering of nested Custom Elements via parse5 AST.

---

### `x-layer`

**Type**: `"server-only" | "server-hydratable" | "client-only"`

**Purpose**: Whether the component can be server-rendered and/or hydrated.

| Value | SSR | Hydration |
|-------|-----|-----------|
| `"server-only"` | ✅ Static DSD | Not needed |
| `"server-hydratable"` | ✅ DSD + event bindings | Required |
| `"client-only"` | ❌ No DSD output | Framework-managed |

**Auto-detectable**: Partially. The analyzer can check `attachShadow()` calls, framework base class usage, and `render()` return type. However, some components may be `client-only` due to runtime dependencies (e.g., `IntersectionObserver`, `HTMLDialogElement`) that static analysis cannot detect.

**Example**:

```json
{
  "kind": "class",
  "name": "LessThemeToggle",
  "tagName": "less-theme-toggle",
  "x-layer": "server-hydratable"
}
```

---

### `x-shadow`

**Type**: `{ mode: "open"|"closed", clonable?: boolean, delegatesFocus?: boolean, serializable?: boolean, slotAssignment?: "named"|"manual" }`

**Purpose**: Shadow DOM configuration for DSD output. Maps to WHATWG DSD template attributes (`shadowrootmode`, `shadowrootclonable`, `shadowrootdelegatesfocus`, `shadowrootserializable`, `shadowrootslotassignment`).

**Auto-detectable**: Yes. The analyzer can extract `attachShadow()` call arguments or class static properties.

**Example**:

```json
{
  "kind": "class",
  "name": "LessDialog",
  "tagName": "less-dialog",
  "x-shadow": {
    "mode": "open",
    "clonable": true,
    "delegatesFocus": true
  }
}
```

---

### `x-renderer`

**Type**: `"lit" | "vanilla" | "generic"`

**Purpose**: Which template rendering backend the component requires. This helps SSR engines select the correct adapter for converting template output to HTML strings.

- `"lit"`: Lit TemplateResult, needs a Lit-to-string adapter
- `"vanilla"`: plain string `render()` output
- `"generic"`: any other rendering approach

**Auto-detectable**: Yes. Check the component's base class (`LitElement` → `"lit"`, `HTMLElement` → `"vanilla"`).

**Example**:

```json
{
  "kind": "class",
  "name": "LessButton",
  "tagName": "less-button",
  "x-renderer": "lit"
}
```

---

## Complete example

```json
{
  "kind": "class",
  "name": "LessDialog",
  "tagName": "less-dialog",
  "attributes": [
    { "name": "open", "type": { "text": "boolean" } }
  ],
  "events": [
    { "name": "less-dialog-open", "type": { "text": "Event" } }
  ],
  "slots": [
    { "name": "" },
    { "name": "footer" }
  ],
  "cssParts": ["panel", "overlay"],
  "x-layer": "server-hydratable",
  "x-render-dependencies": ["less-button"],
  "x-shadow": { "mode": "open", "clonable": true, "delegatesFocus": true },
  "x-renderer": "lit"
}
```
