This the backend of my [MoneyWalletApp](#). this app is written with TypeScript. The database used is MongoDB, I used Mongoose as ORM. I used Express and Passport to manage routing and authentication

# TypeScript

This project is written by TypeScript, some ExpressJS properties has been overridden, every http request and response body is guided by TypeScript interfaces, a documentation has been build with the help of TypeScript

# Debugging

I used Postman for debugging. to view all collection checkout `postman` directory

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

Not Ready Yet
