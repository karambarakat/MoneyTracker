- [ ] when sending corrupted token the whole application hang

  try eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MmYyMGE0MjJiZDRjOWIzMDc0NDU2M2QiLCJpYXQiOjE2NjAwMjk1MDYsImV4cCI6MTY2MDIwMjMwNn0.x7hO9F9-VuAhS_AvIwMqZvW1GG4XYL33Dom0Q3n3_24

  which have

  ```json
  {
    "sub": "62f20a422bd4c9b30744563d",
    "iat": 1660029506,
    "exp": 1660202306
  }
  ```

  what is expected

  ```json
  {
    "_id": "62f20a422bd4c9b30744563d",
    "email": "karam.barakat.99@gmail.com",
    "iat": 1660127354,
    "exp": 1660300154
  }
  ```
