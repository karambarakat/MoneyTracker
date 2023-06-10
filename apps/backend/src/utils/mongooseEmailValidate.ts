export default {
  validator: function (email: string): boolean {
    return /^\S+@\S+\.\S+$/.test(email)
  },
  message: 'not a valid email',
}
