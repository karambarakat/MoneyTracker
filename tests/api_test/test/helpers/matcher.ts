export const userMatcher = {
  res: {
    data: {
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      _id: expect.any(String),
      displayName: expect.any(String),
      token: expect.any(String),
    },
  },
}
