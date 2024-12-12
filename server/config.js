import dotenv from 'dotenv';
dotenv.config();

export const config = {
  botToken: process.env.BOT_TOKEN,
  webAppUrl: process.env.WEBAPP_URL || 'https://your-deployed-url.com',
  port: process.env.PORT || 3000
};