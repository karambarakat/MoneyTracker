import { OpenAPIV3 as v3 } from 'openapi-types'
import parameter from './parameter'
import mayThrow from './mayThrow'
import { docType } from '../proxy'

export type option = {
  type: 'security'
  subType: 'bearer' | 'basic'
}

const parameters = {
  bearer: {
    in: 'header',
    name: 'Authorization',
    description: 'can be obtained by `auth/*/*`, in form of eyxxx.xxx.xxx',
    schema: { type: 'string', example: 'Bearer eyxxx.xxx.xxx' },
    required: true,
  },
  basic: {
    in: 'header',
    name: 'Authorization',
    description: 'base64 email and password pair with colon as separator',
    schema: {
      type: 'string',
      example: 'Basic ZGtAZy5jOjEyMw==',
    },
    required: true,
  },
}

const securityObj = {
  bearer: {
    type: 'http',
    scheme: 'bearer',
    description: `
    this is the standard way to authenticate
    requests, such a token can be obtained via
    emailAuth or googleAuth
    \`\`\`
    curl 'http://exmaple:0000/api/path/to' \
    --H 'Authorization: Bearer eyxxx.xxx.xxx' \
    \`\`\`
    `,
  },
  basic: {
    type: 'http',
    scheme: 'basic',
    description: `
    use email and password to gain
    user's profile along with the
    token.
    \`\`\`
    curl 'http://exmaple:0000/api/path/to' \
      --H 'Authorization: Basic ZGtAZy5jOjEyMw==' \
    \`\`\`
    `,
  },
} satisfies Record<string, v3.SecuritySchemeObject>

function security(
  op: v3.OperationObject,
  options: option,
  trap: { path: (string | number | Symbol)[]; rootDoc: docType }
) {
  // security
  !op.security && (op.security = [])
  op.security.push({ [options.subType]: [] })
  trap.rootDoc.components.securitySchemes[options.subType] =
    securityObj[options.subType]

  // expect param
  parameter(
    op,
    {
      type: 'parameter',
      // @ts-expect-error
      document: parameters[options.subType],
      referenced: options.subType,
    },
    trap
  )

  // if failed
  mayThrow(
    op,
    {
      type: 'mayThrow',
      error:
        options.subType === 'bearer' ? 'BearerTokenFailed' : 'BasicTokenFailed',
    },
    trap
  )
}

export default security
