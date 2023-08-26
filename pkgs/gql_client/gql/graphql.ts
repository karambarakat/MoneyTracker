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

export type Get_Current_ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type Get_Current_ProfileQuery = { __typename?: 'Query', getCurrentUser: { __typename?: 'User', id: string, email: string, displayName?: string | null, avatar?: string | null, providers: string, createdAt: any, updatedAt: any } };


export const Get_Current_ProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"get_current_profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"providers"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<Get_Current_ProfileQuery, Get_Current_ProfileQueryVariables>;