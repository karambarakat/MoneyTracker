import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./schema.json",
  documents: ["test/**/*.ts"],
  generates: {
    "./gql/": {
      preset: "client",
    },
  },
};
export default config;
