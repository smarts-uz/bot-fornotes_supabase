// import { supabase, add, addUser, notes, notesId, rm } from './supabase.js'
import TelegramBot from 'node-telegram-bot-api'
import {createClient} from '@supabase/supabase-js'
// import {supabase} from "./supabase.js";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const supabase = createClient(
    'https://decyitlleemplzimqedq.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlY3lpdGxsZWVtcGx6aW1xZWRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ4MzkwNzcsImV4cCI6MjAxMDQxNTA3N30.-o7eoRQ6RHasA2CHVS1su2lcM9fAk0UbBsQhBmE33gM',
    {
        global: {
            headers: {
                ...corsHeaders,
                'apikey': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlY3lpdGxsZWVtcGx6aW1xZWRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ4MzkwNzcsImV4cCI6MjAxMDQxNTA3N30.-o7eoRQ6RHasA2CHVS1su2lcM9fAk0UbBsQhBmE33gM'
            }
        }
    }
)


const token = '5808842798:AAETfho7rtAFHJ63HuukTL1Ky8AodW260eQ';
const bot = new TelegramBot(token, {polling: true});

const readLineList = {}

bot.setMyCommands([
    {command: '/start', description: 'Старт'},
    {command: '/notes', description: 'Все записи'},
    {command: '/add', description: 'Добавить'},
    {command: '/rm', description: 'Удалить'}
])

//functions
async function addUser(username) {
    return (
        await supabase.from('User').upsert({
                tg_username: username,
            }
        )
    )
}


bot.on('message', (msg) => {
    // const chatId = msg.chat.id;
    const {id: chatId, username} = msg.chat
    const messageText = msg.text;

    if (messageText === '/start') {
        bot.sendMessage(chatId, 'Welcome to the bot!');
    }

    if (messageText === '/notes') {
        bot.sendMessage(chatId, 'you choose notes');
    }

    if (messageText === '/rm') {

        try {
            const {data} = supabase.from('notes').select('text')
            bot.sendMessage(chatId, JSON.stringify(data.text()));
            console.log('data')
            console.log(data.text)

        } catch (e) {
            console.log(e)
        }
    }

    // if (msg.text === '/add') {
    //     readLineList[username] = {
    //         action: 'add',
    //     }
    //     bot.sendMessage(chatId, 'Введите текст:')
    // }

});

// bot.on('message', async (msg) => {
//   const { id: chatId, username } = msg.chat
//   const readLine = readLineList[username]
//
//   if (readLine?.action === 'add') {
//     if (msg.text === '/add' || msg.text === '/notes' || msg.text === '/rm' || msg.text === '/start') {
//       bot.sendMessage(chatId, 'Произошла ошибка')
//       bot.sendMessage(chatId, 'Введите текст:')
//       return
//     } else {
//       try {
//         await add(username, msg.text)
//         bot.sendMessage(chatId, 'Добавлено')
//       } catch (error) {
//         bot.sendMessage(chatId, 'Произошла ошибка')
//       }
//     }
//     delete readLineList[username]
//     return
//   }

// if (readLine?.action === 'rm') {
//   try {
//     const { data } = await notesId(username)
//     await rm(username, data[~~msg.text - 1].id)
//     bot.sendMessage(chatId, 'Удалено')
//   } catch (error) {
//     console.log(error)
//     bot.sendMessage(chatId, 'Произошла ошибка')
//   }
//
//   delete readLineList[username]
// }

// if (msg.text === '/start') {
//   await addUser(username)
// }

// if (msg.text === '/notes') {
//   const { data } = await notes(username)
//   bot.sendMessage(chatId, `Ваши заметки: \n${data.map(({ text }, index) => `${index + 1}. ${text}`).join('\n')}`)
// }

// if (msg.text === '/add') {
//   readLineList[username] = {
//     action: 'add',
//   }
//
//  await bot.sendMessage(chatId, 'Введите текст:')
// }

// if (msg.text === '/rm') {
//   readLineList[username] = {
//     action: 'rm',
//   }
//
//   bot.sendMessage(chatId, 'Введите номер заметки')
// }
// })







