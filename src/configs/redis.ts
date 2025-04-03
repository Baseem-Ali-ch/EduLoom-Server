import { createClient } from 'redis';

const redisClient = createClient({
  url: 'redis://localhost:6379',
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 10) return new Error('Max retries reached');
      return Math.min(retries * 100, 2000); // Exponential backoff, max 2s
    },
  },
});

(async () => {
  try {
    await redisClient.connect();
    console.log('Connected to Redis');
  } catch (err) {
    console.error('Error connecting to Redis:', err);
  }
})();

redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});

export default redisClient;