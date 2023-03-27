/// <reference path="../../index.d.ts" />
// @ts-check
/**
 * @type {(import("json-schema").JSONSchema7)}
 */
export default {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'http://ex.ample/modules/log',
  allOf: [
    { $ref: '/modules/helpers#/definitions/document' },
    { $ref: '/modules/helpers#/definitions/timeStamped' },
    {
      $id: '#base',
      type: 'object',
      required: ['title', 'amount', 'createdBy'],
      additionalProperties: false,
      properties: {
        title: { type: 'string' },
        amount: { type: 'number' },
        createdBy: { type: 'string', readOnly: true },
        note: { type: 'string' },
        category: {
          oneOf: [
            {
              readOnly: true,
              $ref: '/modules/categorySimple',
            },
            {
              writeOnly: true,
              type: 'string',
              format: 'relation::<name>',
              description:
                '`x-onWrite` is true: when creating the doc this field should be of this schema',
            },
          ],
        },
      },
      examples: [
        {
          title: 'buy new TV',
          amount: 400,
          createdBy: '63da2a0a643dd3aa49f5c6b1',
          note: 'new 40" plasma tv from flea market',
        },
      ],
    },
  ],
}
