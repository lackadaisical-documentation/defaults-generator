# @lackadaisical/defaults-generator

A module for generating pandoc defaults files from Markdown YAML frontmatter.

## Installation and Usage

npm:

`npm install @lackadaisical/defaults-generator`

Yarn:

`yarn add @lackadaisical/defaults-generator`

### makeDefaultsFile

```typescript
export default function makeDefaultsFile(
  frontmatter: Record<string, unknown>,
  {
    additionalConfig?: Record<string, unknown>
    projectSettings?: Record<string, unknown>
    outputFile?: string
    writer?: string
  }
): defaultsFile {
```

Where:

`frontmatter`, `additionalConfig`, and `projectSettings` are the configurations that you want to generate a defaults file from.

If duplicate keys exist, precedence is `projectSettings` < `additionalConfig` < `frontmatter`.

Optional values passed to the function will override `output-file` and `writer` keys in the input object.

> Note: If you don't provide a `writer`, and and do provide an `output-file` the module will attempt to pick an appropriate writer based on pandoc's logic.

## Validation

Defaults file keys are validated against a built-in schema.

If a key does not exist in the schema, it will be placed under the `variables:` key.

If a key exists in the schema its type (or value, depending on the key) must match those specified in the schema, else an error will be thrown. This utility only generates *valid* defaults files.
