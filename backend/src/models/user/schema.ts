import * as yup from 'yup'
import { v4 as uuidv4 } from 'uuid'

// firstName, lastName, userName, email, password

export const userSchema = yup.object().shape({
  userName: yup.string().default(function () {
    return 'user-' + uuidv4().split('-')[0]
  }),
  email: yup.string().email(),
  password: yup.string().required(),
  createdAt: yup.date().default(function () {
    return new Date()
  }),
  updatedAt: yup.date().default(function () {
    return new Date()
  }),
})

export interface UserInterface {
  _id: string
  userName: string
  email: string
  password: string
  createAt: string
  updateAt: string
}
