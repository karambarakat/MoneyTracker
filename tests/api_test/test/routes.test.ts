let log_1: string
let token: string
let cat_1: string
let cat_2: string

describe.beforeAll(async () => {
  const client = new MongoClient(process.env.MONGO_STRING || '')

  await client.connect()

  await client.db(process.env.MONGO_DB || 'test').dropDatabase()

  client.close()

  await db_conn()

  const res = await request
    .post('/api/v1/auth/local/register')
    .set(
      'Authorization',
      'Basic ' + Buffer.from('example4@web.com:pass').toString('base64'),
    )

  token = res.body.data.token

  const res2 = await request
    .post('/api/v1/category')
    .set('Authorization', 'Bearer ' + token)
    .send({
      title: 'cat-1',
      color: '#000000',
      icon: 'icon',
    })

  cat_1 = res2.body.data._id
})

const info = (res: any) => ({
  body: res.body,
  status: res.status,
  type: res.type,
})

it('/', async () => {
  const res = await request.get('/')
  expect(info(res)).toMatchSnapshot()
})

it('/api/v1', async () => {
  const res = await request.get('/api/v1')
  expect(info(res)).toMatchSnapshot()
})

it('/api/v1/auth/local/register', async () => {
  const res0 = await request.post('/api/v1/auth/local/register')

  expect(info(res0)).toMatchSnapshot()

  const res = await request
    .post('/api/v1/auth/local/register')
    .set(
      'Authorization',
      'Basic ' + Buffer.from('example@web.com:pass').toString('base64'),
    )
    .send({
      displayName: 'user-1',
    })

  expect(res.body.data.displayName).toBe('user-1')
  expect(info(res)).toMatchSnapshot(profileMatcher)

  const res3 = await request
    .post('/api/v1/auth/local/register')
    .set(
      'Authorization',
      'Basic ' + Buffer.from('example2@web.com:pass').toString('base64'),
    )

  expect(info(res3)).toMatchSnapshot({
    body: {
      data: {
        ...profileMatcher.body.data,
        displayName: expect.any(String),
      },
    },
  })
})

it('/api/v1/auth/local/login', async () => {
  const res = await request.post('/api/v1/auth/local/login')

  expect(info(res)).toMatchSnapshot()

  await request
    .post('/api/v1/auth/local/register')
    .set(
      'Authorization',
      'Basic ' + Buffer.from('example3@web.com:pass').toString('base64'),
    )
  const res2 = await request
    .post('/api/v1/auth/local/login')
    .set(
      'Authorization',
      'Basic ' + Buffer.from('example3@web.com:pass').toString('base64'),
    )
  expect(info(res2)).toMatchSnapshot(profileMatcher)

  const res3 = await request
    .post('/api/v1/auth/local/login')
    .set(
      'Authorization',
      'Basic ' + Buffer.from('example3@web.com:pass_diff').toString('base64'),
    )
  expect(info(res3)).toMatchSnapshot()
})

it('/api/v1/profile/status', async () => {
  const res = await request.get('/api/v1/profile/status').send({
    email: 'example4__@web.com',
  })

  expect(info(res)).toMatchSnapshot()

  const res2 = await request.get('/api/v1/profile/status').send({
    email: 'example4@web.com',
  })

  expect(info(res2)).toMatchSnapshot()
})

it('/api/v1/profile/ get', async () => {
  const res = await request
    .get('/api/v1/profile')
    .set('Authorization', 'Bearer ' + token)

  expect(info(res)).toMatchSnapshot(profileMatcher)
})

it('/api/v1/profile/ put', async () => {
  const res = await request
    .put('/api/v1/profile')
    .set('Authorization', 'Bearer ' + token)
    .send({
      displayName: 'user-new',
      picture: 'https://example.com/picture',
    })

  expect(res.body.data.displayName).toBe('user-new')

  expect(info(res)).toMatchSnapshot(profileMatcher)
})

it('/api/v1/profile/password', async () => {
  const res = await request
    .put('/api/v1/profile/password')
    .set('Authorization', 'Bearer ' + token)
    .send({
      oldPassword: 'pass',
      newPassword: 'pass_new',
    })

  expect(info(res)).toMatchSnapshot(profileMatcher)

  const res2 = await request
    .post('/api/v1/auth/local/login')
    .set(
      'Authorization',
      'Basic ' + Buffer.from('example4@web.com:pass_new').toString('base64'),
    )

  expect(info(res2)).toMatchSnapshot(profileMatcher)
})

it('protected /api/v1/log', async () => {
  const res = await request.get('/api/v1/log')

  expect(info(res)).toMatchSnapshot()
})

it('/api/v1/log get empty', async () => {
  const res = await request
    .get('/api/v1/log')
    .set('Authorization', 'Bearer ' + token)

  expect(info(res)).toMatchSnapshot()
})

it('/api/v1/log post', async () => {
  const res = await request
    .post('/api/v1/log')
    .set('Authorization', 'Bearer ' + token)

  expect(info(res)).toMatchSnapshot()

  const res2 = await request
    .post('/api/v1/log')
    .set('Authorization', 'Bearer ' + token)
    .send({
      title: 'log-1',
      amount: 100,
    })

  log_1 = res2.body.data._id
  expect(info(res2)).toMatchSnapshot(LogMatcherNull)

  const res3 = await request
    .post('/api/v1/log')
    .set('Authorization', 'Bearer ' + token)
    .send({
      title: 'log-2',
      amount: 200,
      category: cat_1,
      icon: 'icon',
      note: 'note',
    })

  expect(info(res3)).toMatchSnapshot(LogMatcher)
})

it('/api/v1/log get', async () => {
  const res = await request
    .get('/api/v1/log/non' + log_1)
    .set('Authorization', 'Bearer ' + token)

  expect(info(res)).toMatchSnapshot()

  const res2 = await request
    .get('/api/v1/log/' + log_1)
    .set('Authorization', 'Bearer ' + token)

  expect(info(res2)).toMatchSnapshot(LogMatcherNull)
})

it('/api/v1/log put', async () => {
  const res = await request
    .put('/api/v1/log/' + log_1)
    .set('Authorization', 'Bearer ' + token)
    .send({
      title: 'log-1-new',
      amount: 1000,
      category: cat_1,
      icon: 'new_icon',
      note: 'new_note',
    })

  expect(info(res)).toMatchSnapshot(LogMatcher)
})

it('/api/v1/log delete', async () => {
  const res = await request
    .delete('/api/v1/log/' + log_1)
    .set('Authorization', 'Bearer ' + token)

  expect(info(res)).toMatchSnapshot()

  const res2 = await request
    .get('/api/v1/log/' + log_1)
    .set('Authorization', 'Bearer ' + token)

  expect(info(res2)).toMatchSnapshot()
})

it('/api/v1/log get all', async () => {
  const res = await request
    .get('/api/v1/log')
    .set('Authorization', 'Bearer ' + token)

  // expect(info(res)).toMatchSnapshot()
  for (const elem of res.body.data) {
    expect(elem).toMatchSnapshot(LogMatcher.body.data)
  }
})

it('/api/v1/category protected', async () => {
  const res = await request.get('/api/v1/category')

  expect(info(res)).toMatchSnapshot()
})

it('/api/v1/category get empty', async () => {
  await request
    .delete('/api/v1/category/' + cat_1)
    .set('Authorization', 'Bearer ' + token)

  const res = await request
    .get('/api/v1/category')
    .set('Authorization', 'Bearer ' + token)

  expect(info(res)).toMatchSnapshot()
})

it('/api/v1/category post', async () => {
  const res = await request
    .post('/api/v1/category')
    .set('Authorization', 'Bearer ' + token)

  expect(info(res)).toMatchSnapshot()

  const res2 = await request
    .post('/api/v1/category')
    .set('Authorization', 'Bearer ' + token)
    .send({
      title: 'cat-2',
    })

  cat_2 = res2.body.data._id

  expect(info(res2)).toMatchSnapshot(CategoryMatcher)

  const res3 = await request
    .post('/api/v1/category')
    .set('Authorization', 'Bearer ' + token)
    .send({
      title: 'cat-3',
      color: '#000000',
      icon: 'icon',
    })

  expect(info(res3)).toMatchSnapshot(CategoryMatcher)
})

it('/api/v1/category get', async () => {
  const res = await request
    .get('/api/v1/category/' + cat_2)
    .set('Authorization', 'Bearer ' + token)

  expect(info(res)).toMatchSnapshot(CategoryMatcher)

  const res2 = await request
    .get('/api/v1/category/not_found' + cat_2)
    .set('Authorization', 'Bearer ' + token)

  expect(info(res2)).toMatchSnapshot()
})

it('/api/v1/category put', async () => {
  const res = await request
    .put('/api/v1/category/' + cat_2)
    .set('Authorization', 'Bearer ' + token)
    .send({
      title: 'cat-1-new',
      color: '#000001',
      icon: 'icon_new',
    })

  expect(info(res)).toMatchSnapshot(CategoryMatcher)
})

it('/api/v1/category delete', async () => {
  const res = await request
    .delete('/api/v1/category/' + cat_2)
    .set('Authorization', 'Bearer ' + token)

  expect(info(res)).toMatchSnapshot()

  const res2 = await request
    .get('/api/v1/category/' + cat_2)
    .set('Authorization', 'Bearer ' + token)

  expect(info(res2)).toMatchSnapshot()
})

it('/api/v1/category get all', async () => {
  const res = await request
    .get('/api/v1/category')
    .set('Authorization', 'Bearer ' + token)

  // expect(info(res)).toMatchSnapshot()
  for (const elem of res.body.data) {
    expect(elem).toMatchSnapshot(CategoryMatcher.body.data)
  }
})

const profileMatcher = {
  body: {
    data: {
      updatedAt: expect.any(String),
      createdAt: expect.any(String),
      _id: expect.any(String),
      token: expect.stringMatching(/^eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9/),
      displayName: expect.any(String),
    },
  },
}

const LogMatcherNull = {
  body: {
    data: {
      _id: expect.any(String),
      updatedAt: expect.any(String),
      createdAt: expect.any(String),
      createdBy: expect.any(String),
    },
  },
}
const LogMatcher = {
  body: {
    data: {
      _id: expect.any(String),
      category: {
        _id: expect.any(String),
      },
      updatedAt: expect.any(String),
      createdAt: expect.any(String),
      createdBy: expect.any(String),
    },
  },
}

const CategoryMatcher = {
  body: {
    data: {
      _id: expect.any(String),
      createdBy: expect.any(String),
    },
  },
}
