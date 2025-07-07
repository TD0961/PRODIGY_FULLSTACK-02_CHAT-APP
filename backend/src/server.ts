import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { registerSocketHandlers } from './sockets';
import { connectDB } from './utils/db';

const PORT = process.env.PORT || 5000;

const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: '*', // Adjust this in production for security
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  registerSocketHandlers(socket, io);
});

// Start server first, then try to connect to MongoDB
httpServer.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  
  // Try to connect to MongoDB (non-blocking)
  try {
    await connectDB();
  } catch (error) {
    console.log('Server running without database connection');
  }
});
