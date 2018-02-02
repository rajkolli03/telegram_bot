const Telegraf = require('telegraf')
const express = require('express');
const expressApp = express();

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const PORT = process.env.PORT || 3000;
const URL = process.env.URL;

const bot = new Telegraf(BOT_TOKEN);
bot.telegram.setWebhook(`${URL}/bot${BOT_TOKEN}`);
expressApp.use(bot.webhookCallback(`/bot${BOT_TOKEN}`));

/*
 your bot commands and all the other stuff on here ....
*/

bot.start((ctx) => {
  console.log('started:', ctx.from.id)
  return ctx.reply('Welcome!')
})

bot.command('help', (ctx) => ctx.reply('Try send a sticker!'))
bot.hears('hi', (ctx) => ctx.reply('Hey there!'))
bot.hears(/buy/i, (ctx) => ctx.reply('Buy-buy!'))
bot.on('sticker', (ctx) => ctx.reply('👍'))


// and at the end just start server on PORT
expressApp.get('/', (req, res) => {
  res.send('Hello World!');
});
expressApp.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
