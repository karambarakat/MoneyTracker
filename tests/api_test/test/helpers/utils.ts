import { faker } from '@faker-js/faker'

export interface User {
  email: string
  displayName: string
  password: string
}

export function getRandomUser() {
  return {
    email: faker.internet.email(),
    displayName: faker.person.firstName(),
    password: faker.internet.password(),
  } as User
}
