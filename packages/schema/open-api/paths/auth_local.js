// @ts-check
import profile from '../../json-schema/modules/profile.js'

/**
 * @param {import('../../src/wrappers/openapi/index.js').default} _
 *
 */
export default (_) => {
  _.addPath('/auth/local/login', 'post', [
    {
      type: 'meta',
      tag: 'local authorization',
      description:
        'login using email and password using Basic token http header',
      summary: 'login',
    },
    { type: 'security', subType: 'basic' },
    { type: 'mayThrow', error: 'e_401EmailOrPasswordIncorrect' },
    { type: 'read', schema: profile },
  ])
  _.addPath('/auth/local/register', 'post', [
    {
      type: 'meta',
      tag: 'local authorization',
      summary: 'register',
      description: 'make new account with a displayName',
    },
    { type: 'security', subType: 'basic' },
    { type: 'mayThrow', error: 'e_409UserAlreadyExist' },
    { type: 'create', schema: profile },
  ])
}
