import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
    'decyitlleemplzimqedq',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlY3lpdGxsZWVtcGx6aW1xZWRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ4MzkwNzcsImV4cCI6MjAxMDQxNTA3N30.-o7eoRQ6RHasA2CHVS1su2lcM9fAk0UbBsQhBmE33gM'
)
export async function notes(username) {
  return await supabase.from('notes').select('text').eq('owner', username)
}

export async function notesId(username) {
  return await supabase.from('notes').select('id').eq('owner', username)
}

export async function addUser(username) {
  return await supabase.from('User').upsert({ tg_username: username,})
}

export async function add(username, text) {
  return await supabase.from('notes').insert({ text, owner: username })
}

export async function rm(username, id) {
  return await supabase.from('notes').delete().match({
    owner: username,
    id: id,
  })
}

// export default supabase
