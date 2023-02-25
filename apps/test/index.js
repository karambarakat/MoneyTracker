const openapi = require('openapi')

const express = require('express')

const app = express()

app.get("/get", (req, res) => {
  res.json(openapi)
})

app.listen(3333, () => {
  console.log("listing on 3333")
})
