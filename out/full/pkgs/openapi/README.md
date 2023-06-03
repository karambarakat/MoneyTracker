# OpenApi Specification:

This package contains all open-api specification for my backend.

## src

following single-responsibility principle the spec is defined by multiple files located in src folder.

the roles for building these files are:

1. all files should follow the root OpenApi spec not a subset of the doc
2. global $ref should be placed under `component` only, then local $ref can be used outside `components`

## pipeline

### build

running

```
pnpm build
```

will do the following:

1. in `build.js`: read all yaml files in scr directory
2. in `build.js`: dereference all external refs
3. in `build.js`: merge the output via `lodash.merge`
4. generate markdown documentation
