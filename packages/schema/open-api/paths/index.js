// @ts-ignore
import * as auth_local_login from './auth_local_login.js'
import * as auth_local_register from './auth_local_register.js'
import * as category_$id_logs from './category_$id_logs.js'
import * as category_$id from './category_$id.js'
import * as category from './category.js'
import * as profile_password from './profile_password.js'
import * as profile_status from './profile_status.js'
import * as profile from './profile.js'
import * as log from './log.js'
import * as log_$id from './log_$id.js'

export default constructPaths({
  category,
  category_$id,
  category_$id_logs,
  log,
  log_$id,
  profile,
  profile_password,
  profile_status,
  auth_local_login,
  auth_local_register,
})

function key(paths) {
  var rt = paths
    .split('_')
    .map((key) => {
      if (key.startsWith('$')) {
        return '{' + key.slice(1) + '}'
      }
      return key
    })
    .join('/')

  if (!rt.startsWith('/')) rt = '/' + rt
  if (!rt.endsWith('/')) rt = rt + '/'

  return rt
}

function value(module) {
  const value = {}
  for (const [method, path] of Object.entries(module)) {
    value[method === 'delete_' ? 'delete' : method] = path
  }
  return value
}

function constructPaths(modules) {
  /**
   * @type {Record<string, Record<string, import('openapi-types').OpenAPIV3.PathsObject>>}
   */
  const paths = {}
  for (const [name, module] of Object.entries(modules)) {
    paths[key(name)] = value(module)
  }
  return paths
}
