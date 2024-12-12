import WebApp from '@twa-dev/sdk';
import { rateLimiter } from '../rateLimiter';

export const sendDataToBot = async (data: any) => {
  try {
    if (!rateLimiter.canMakeRequest('scoreUpdate', 5000)) {
      console.log('Rate limited: Too many score updates');
      return;
    }
    
    await WebApp.sendData(JSON.stringify(data));
  } catch (error) {
    console.error('Error sending data to bot:', error);
  }
};