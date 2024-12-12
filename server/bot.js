import { Telegraf } from 'telegraf';
import express from 'express';
import { config } from './config.js';

const bot = new Telegraf(config.botToken);
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Bot commands setup
const commands = [
  { command: 'start', description: 'Start mining NotImpactCoins' },
  { command: 'help', description: 'Show help information' },
  { command: 'balance', description: 'Check your coin balance' },
  { command: 'daily', description: 'Claim daily bonus' },
  { command: 'referral', description: 'Get your referral link' }
];

// Set bot commands
bot.telegram.setMyCommands(commands);

// Command handlers
bot.command('start', (ctx) => {
  const userId = ctx.from.id;
  const username = ctx.from.username;
  
  ctx.reply('Welcome to NotImpactCoin! Start mining your coins now! 🪙', {
    reply_markup: {
      inline_keyboard: [[
        { text: '🎮 Play NotImpactCoin', web_app: { url: config.webAppUrl }}
      ]]
    }
  });
});

bot.command('help', (ctx) => {
  const helpText = `
🎮 *NotImpactCoin Bot Commands*

/start - Start mining NotImpactCoins
/help - Show this help message
/balance - Check your coin balance
/daily - Claim daily bonus
/referral - Get your referral link

🎯 *How to earn coins:*
• Play mini-games
• Complete daily tasks
• Invite friends
• Claim daily bonus
`;
  
  ctx.replyWithMarkdown(helpText);
});

bot.command('balance', (ctx) => {
  // TODO: Implement balance checking from database
  ctx.reply('💰 Your current balance will be displayed here');
});

bot.command('daily', (ctx) => {
  // TODO: Implement daily bonus system
  ctx.reply('🎁 Daily bonus system coming soon!');
});

bot.command('referral', (ctx) => {
  const username = ctx.from.username;
  if (!username) {
    return ctx.reply('⚠️ Please set a Telegram username to get your referral link!');
  }
  
  const referralLink = `https://t.me/NotImpactCoin_Bot?start=${username}`;
  ctx.reply(`🔗 Your referral link:\n${referralLink}\n\n💰 Earn coins for each friend who joins!`);
});

// Handle game score updates
bot.on('message', async (ctx) => {
  if (ctx.webAppData) {
    try {
      const data = JSON.parse(ctx.webAppData.data);
      // TODO: Update user's score in database
      console.log('Received web app data:', data);
      ctx.reply(`✨ Score updated: ${data.score} coins`);
    } catch (error) {
      console.error('Error processing web app data:', error);
    }
  }
});

// Error handling
bot.catch((err, ctx) => {
  console.error('Bot error:', err);
  ctx.reply('Sorry, something went wrong. Please try again later.');
});

// Start bot
bot.launch().then(() => {
  console.log('Bot is running!');
}).catch((err) => {
  console.error('Bot launch failed:', err);
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

// Start express server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});