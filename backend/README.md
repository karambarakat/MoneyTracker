This the backend of my [MoneyWalletApp](#). this app is written with TypeScript. The database used is MongoDB, I used Mongoose as ORM. I used Express and Passport to manage routing and authentication

# TypeScript

This project is written by TypeScript, some ExpressJS properties has been overridden, every http request and response body is guided by TypeScript interfaces, a documentation has been build with the help of TypeScript

# Debugging

I used Postman for debugging. to view all collection checkout [postman](https://www.postman.com/speeding-zodiac-567713/workspace/money-tracker)

# Production

Compile to JavaScript, then run it:

```
npm run build
npm run start
```

this will generate javascript files in `build` directory

To skip the compilation:

```
npm run start:ts-node
```

# Development

Using `ts-node-dev`:

```
npm run dev
```

# Tests

To run tests using `Jest`:

```
npm run test
```

General testing files are in `\_\_Tests\_\_`directory. and some testing files lives near the code being tested and ends by .test.ts

# Documentation

This project uses Open Api Specification to document its schema and rest api.

To generate final and bundle openapi specification run:

```
npm run doc:bundle
```

The final specificaton is placed at `openapi-bundle.yaml` and `src/openapi-bundle.json`. and you can view Swagger UI via visiting `/docs` or running `npm run doc`.

The unbundled specifications are defined in two place:

1. `./src/openapi/**/*.yaml` these files may reference any other yaml file. All external $ref will dereferenced, internal $ref will not be touched
2. as JsDoc comments starts with `@openapi`
3. for `openapi`, `info.title` and `info.version` will be defined in `src/openapi/info.yaml`, any other locations will be overridden
