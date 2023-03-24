# schema
this package acts as the source of truth for the app's TypeScript's declaration, database schema, rest api JSON schema and any possible documentation

## schemas
all schemas are to be found at `json-schema` folder. This includes the following:
- `oepn-api`: define all the rest api routes based on open-api specification v3.
- `modules`: all the basic json schema
- `database` (todo): used as schema for MongoDB [see](https://www.mongodb.com/docs/manual/core/schema-validation/specify-json-schema/#std-label-schema-validation-json) <!-- todo -->
- etc

## building
the build command generates:
- typescript deceleration
- (todo) documentation <!-- todo -->
- (todo) etc <!-- todo -->

run:
```
npm run build 
```

the source code for this command found in `src` folder

## types

this app is vanilla javascript, however to reap all the benefits of typescript I used jsDoc comments, ts-check and reference to `index.d.ts`
```js
/// <reference path="../../index.d.ts" />
// @ts-check
/**
 * @type {import("json-schema").JSONSchema7}
 */
```