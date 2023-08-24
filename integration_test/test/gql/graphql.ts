/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type Category = {
  __typename?: 'Category';
  color?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  createdBy: User;
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type CategoryInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type Entry = {
  __typename?: 'Entry';
  amount: Scalars['Float']['output'];
  category: Category;
  createdAt: Scalars['Date']['output'];
  createdBy: User;
  id: Scalars['ID']['output'];
  note?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type EntryInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  category?: InputMaybe<Scalars['ID']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createManyCategories: Array<Category>;
  createManyEntries: Array<Entry>;
  createOneCategory: Category;
  createOneEntry: Entry;
  deleteManyCategories: Scalars['Int']['output'];
  deleteManyEntries: Scalars['Int']['output'];
  deleteOneCategory: Scalars['Boolean']['output'];
  deleteOneEntry: Scalars['Boolean']['output'];
  updateCurrentUser: User;
  updateOneCategory: Scalars['Boolean']['output'];
  updateOneEntry: Scalars['Boolean']['output'];
  updatePassword: Scalars['Boolean']['output'];
};


export type MutationCreateManyCategoriesArgs = {
  categories: Array<CategoryInput>;
};


export type MutationCreateManyEntriesArgs = {
  entries: Array<EntryInput>;
};


export type MutationCreateOneCategoryArgs = {
  category: CategoryInput;
};


export type MutationCreateOneEntryArgs = {
  entry: EntryInput;
};


export type MutationDeleteManyCategoriesArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type MutationDeleteManyEntriesArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type MutationDeleteOneCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteOneEntryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateCurrentUserArgs = {
  user: UserInput;
};


export type MutationUpdateOneCategoryArgs = {
  category: CategoryInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateOneEntryArgs = {
  entry: EntryInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdatePasswordArgs = {
  password: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAllCategories: Array<Category>;
  getAllEntries: Array<Entry>;
  getCurrentUser: User;
  getOneCategory?: Maybe<Category>;
  getOneEntry?: Maybe<Entry>;
};


export type QueryGetOneCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetOneEntryArgs = {
  id: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  displayName?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  providers: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type UserInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
};

export type NewQueryVariables = Exact<{ [key: string]: never; }>;


export type NewQuery = { __typename?: 'Query', getAllCategories: Array<{ __typename?: 'Category', id: string }> };

export type PostsdsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsdsQuery = { __typename?: 'Query', getAllEntries: Array<{ __typename?: 'Entry', category: { __typename?: 'Category', icon?: string | null } }> };


export const NewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"new"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<NewQuery, NewQueryVariables>;
export const PostsdsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Postsds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllEntries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}}]}}]}}]} as unknown as DocumentNode<PostsdsQuery, PostsdsQueryVariables>;