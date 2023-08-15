import fetch from 'node-fetch'

export const clean_db = async () => {
  await fetch('http://localhost:4202/clean_db')
}

export const clean_user = async (id: string | undefined) => {
  if (!id) return
  await fetch(`http://localhost:4202/remove_user_data/${id}`)
}
