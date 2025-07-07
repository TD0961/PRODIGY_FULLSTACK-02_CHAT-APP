import express from 'express';
import { getMessages, createMessage } from './controllers/messageController';
import { register, login, getProfile } from './controllers/authController';
import { auth } from './middlewares/auth';

const app = express();

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Auth routes
app.post('/api/auth/register', register);
app.post('/api/auth/login', login);
app.get('/api/auth/profile', auth as any, getProfile);

// Message routes
app.get('/api/messages', getMessages);
app.post('/api/messages', createMessage);

export default app;
