export const Category = /* GraphQL */ `
  fragment Category on Category {
    id
    title
    color
    icon
  }
`

export const User = /* GraphQL */ `
  fragment User on User {
    avatar
    createdAt
    displayName
    email
    id
    providers
    updatedAt
  }
`

export const Entry = /* GraphQL */ `
  fragment Entry on Entry {
    id
    title
    amount
    note
    createdAt
    updatedAt
    category {
      id
      title
      color
      icon
    }
  }
`
