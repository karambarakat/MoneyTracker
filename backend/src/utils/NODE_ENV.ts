type environments = 'development' | 'production' | 'test' | undefined

export default function NODE_ENV(): environments {
  if (process.env.TS_NODE_DEV) return 'development'
  return process.env.NODE_ENV as environments
}
