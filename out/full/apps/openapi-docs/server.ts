async function main() {
  const PORT = 8811
  const app = express()
  app.use(doc)
  app.get('*', (_, res) => res.redirect('/docs'))
  app.listen(PORT, () => console.log(`listening at port ${PORT}`))
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
