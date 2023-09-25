// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import TelegramBot from '../../supabase/node_modules/node-telegram-bot-api/lib'

const bot = new TelegramBot(Deno.env.get("BOT_TOKEN"), { polling: true})
const readLineList = {}

serve(async (req) => {

  try {
    bot.setMyCommands([
      { command: '/start', description: 'Старт' },
      { command: '/notes', description: 'Все записи' },
      { command: '/add', description: 'Добавить' },
      { command: '/rm', description: 'Удалить' }
    ])

    bot.on('message', async (msg) => {
      const {id: chatId, username} = msg.chat
      const readLine = readLineList[username]

      if (readLine?.action === 'add') {
        if (msg.text === '/add' || msg.text === '/notes' || msg.text === '/rm' || msg.text === '/start') {
          bot.sendMessage(chatId, 'Произошла ошибка')
          bot.sendMessage(chatId, 'Введите текст:')
          return
        } else {
          try {
            await add(username, msg.text)
            bot.sendMessage(chatId, 'Добавлено')
          } catch (error) {
            bot.sendMessage(chatId, 'Произошла ошибка')
          }
        }
        delete readLineList[username]
        return
      }

      if (readLine?.action === 'rm') {
        try {
          const {data} = await notesId(username)
          await rm(username, data[~~msg.text - 1].id)
          bot.sendMessage(chatId, 'Удалено')
        } catch (error) {
          console.log(error)
          bot.sendMessage(chatId, 'Произошла ошибка')
        }

        delete readLineList[username]
      }

      if (msg.text === '/start') {
        addUser(username)
      }

      if (msg.text === '/notes') {
        const {data} = await notes(username)
        bot.sendMessage(chatId, `Ваши заметки: \n${data.map(({text}, index) => `${index + 1}. ${text}`).join('\n')}`)
      }

      if (msg.text === '/add') {
        readLineList[username] = {
          action: 'add',
        }

        bot.sendMessage(chatId, 'Введите текст:')
      }

      if (msg.text === '/rm') {
        readLineList[username] = {
          action: 'rm',
        }

        bot.sendMessage(chatId, 'Введите номер заметки')
      }
    }






  } catch (e) {

  }

  return new Response(
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" } },
  )
})

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
