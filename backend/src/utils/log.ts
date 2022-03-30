const colors: { [key: string]: string } = {
  app: '\x1b[33m',
  database: '\x1b[35m',
  environment: '\x1b[36m',
}

type types = 'database' | 'environment' | 'app'

export default function log(type: types, ...args: any[]) {
  if (process.env.NODE_ENV !== 'test')
    console.log(`${colors[type]}%s\x1b[0m`, `[${type}]`, '--', ...args)
}
