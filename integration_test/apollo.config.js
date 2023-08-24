/* eslint-env node */
module.exports = {
  client: {
    includes: ["./**/*.ts"],
    service: {
      name: "test",
      localSchemaFile: "./schema.json",
    },
  },
};
