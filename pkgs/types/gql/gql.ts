/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment Category on Category {\n    id\n    title\n    color\n    icon\n  }\n": types.CategoryFragmentDoc,
    "\n  fragment User on User {\n    avatar\n    createdAt\n    displayName\n    email\n    id\n    providers\n    updatedAt\n  }\n": types.UserFragmentDoc,
    "\n  fragment Entry on Entry {\n    id\n    title\n    amount\n    note\n    createdAt\n    updatedAt\n    category {\n      id\n      title\n      color\n      icon\n    }\n  }\n": types.EntryFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Category on Category {\n    id\n    title\n    color\n    icon\n  }\n"): (typeof documents)["\n  fragment Category on Category {\n    id\n    title\n    color\n    icon\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment User on User {\n    avatar\n    createdAt\n    displayName\n    email\n    id\n    providers\n    updatedAt\n  }\n"): (typeof documents)["\n  fragment User on User {\n    avatar\n    createdAt\n    displayName\n    email\n    id\n    providers\n    updatedAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Entry on Entry {\n    id\n    title\n    amount\n    note\n    createdAt\n    updatedAt\n    category {\n      id\n      title\n      color\n      icon\n    }\n  }\n"): (typeof documents)["\n  fragment Entry on Entry {\n    id\n    title\n    amount\n    note\n    createdAt\n    updatedAt\n    category {\n      id\n      title\n      color\n      icon\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;