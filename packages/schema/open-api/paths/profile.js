// @ts-check

/**
 * @param {import('../../src/wrappers/openapi/index.js').default} _
 *
 */
export default (_) => {
  _.addPath('/profile/status/', 'get', [
    {
      type: 'meta',
      tag: 'profile',
      summary: 'authentication status',
      description:
        'when provided with email, this will resolve to all available authentication methods for given email',
    },
    {
      type: 'request',
      schema: '/requests/profile#email_status',
      required: true,
    },
    { type: 'read', schema: '/modules/profile#providers' },
  ])

  _.addPath('/profile/', 'get', [
    {
      type: 'meta',
      tag: 'profile',
      summary: 'get profile',
      description: 'retrieve profile info',
    },
    { type: 'security', subType: 'bearer' },
    { type: 'read', schema: '/modules/profile' },
  ])

  _.addPath('/profile/', 'put', [
    {
      type: 'meta',
      tag: 'profile',
      summary: 'update profile',
      description: 'update profile information',
    },
    { type: 'security', subType: 'bearer' },
    { type: 'update', schema: '/requests/profile#profile_update' },
  ])

  _.addPath('/profile/password/', 'put', [
    {
      type: 'meta',
      tag: 'profile',
      summary: 'update password',
      description: 'update password',
    },
    { type: 'security', subType: 'bearer' },
    {
      type: 'request',
      schema: '/requests/profile#updatePassword',
      required: true,
    },
    { type: 'update', schema: '/requests/profile#updatePassword' },
  ])
}
