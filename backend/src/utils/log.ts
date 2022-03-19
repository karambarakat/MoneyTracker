const colors: { [key: string]: string } = {
  database: '\x1b[35m',
  environment: '\x1b[36m',
}

type types = 'database' | 'environment'

export default function log(type: types, ...args: any[]) {
  console.log(`${colors[type]}%s\x1b[0m`, `[${type}]`, '--', ...args)
}
