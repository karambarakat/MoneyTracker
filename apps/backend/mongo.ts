// this is to make the database ephemeral

const dbs = db.getMongo().getDBNames()
for (const i in dbs) {
  db = db.getMongo().getDB(dbs[i])
  print('dropping db ' + db.getName())
  db.dropDatabase()
}
