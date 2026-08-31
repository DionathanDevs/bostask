import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'
import {creatingTaskInKanban } from './create.tasks.js'
import dotenv from 'dotenv'

const createTask = async (txt) => {

  const tasks = txt.split(',')

  const obj = {
    title: tasks[0],
    description: tasks[1],
    tag: tasks[2]
  }

  if (obj?.title != null && obj?.description != null && obj?.tag != null)
    try {

      await creatingTaskInKanban(obj)

      return true

    } catch (err) {

      throw err

    }
}
dotenv.config()

const bot = new Telegraf(process.env.BOT_TOKEN)



bot.command('quit', async (ctx) => {
  // Explicit usage
  await ctx.telegram.leaveChat(ctx.message.chat.id)

  // Using context shortcut
  await ctx.leaveChat()
})

bot.on(message('text'), async (context) => {
  // Explicit usage
  const success = await createTask(context.message.text)

  try {

    if (success) {
      await context.reply(`Task criada com sucesso!`)
    }

    await context.reply(`Houve um problema ao criar a task!`)
  } catch (err) {
    await context.reply('ERRO: ', err.message)
  }

}
)

bot.on('callback_query', async (ctx) => {
  // Explicit usage
  await ctx.telegram.answerCbQuery(ctx.callbackQuery.id)

  // Using context shortcut
  await ctx.answerCbQuery()
})

bot.on('inline_query', async (ctx) => {
  const result = []
  // Explicit usage
  await ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result)

  // Using context shortcut
  await ctx.answerInlineQuery(result)
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))