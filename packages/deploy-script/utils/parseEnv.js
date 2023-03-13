exports.parseEnv = () => {
  return {
    token:
      process.env.TF_Token ||
      err('`TF_Token` was not provided as environment variable'),
    env: process.env.NODE_ENV || 'e',
    v: process.env.Version || 'v',
    organization:
      process.env.TF_Organization ||
      err('`TF_Organization` was not provided as environment variable'),
  }
}
