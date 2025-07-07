import { Server, Socket } from 'socket.io';
import { Message } from '../models/Message';
import mongoose from 'mongoose';

export function registerSocketHandlers(socket: Socket, io: Server) {
  console.log('A user connected:', socket.id);

  // Send existing messages to newly connected user
  socket.on('get messages', async () => {
    try {
      // Check if MongoDB is connected
      if (mongoose.connection.readyState !== 1) {
        socket.emit('messages history', []);
        return;
      }
      
      const messages = await Message.find().sort({ createdAt: 1 });
      socket.emit('messages history', messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      socket.emit('messages history', []);
    }
  });

  // Listen for chat messages from this client
  socket.on('chat message', async (data: { senderId: string; message: string }) => {
    try {
      // Check if MongoDB is connected
      if (mongoose.connection.readyState !== 1) {
        // Create a temporary message object without saving to DB
        const tempMessage = {
          _id: new mongoose.Types.ObjectId(),
          senderId: data.senderId,
          message: data.message,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        // Broadcast the message to all clients (including sender)
        io.emit('chat message', tempMessage);
        return;
      }

      // Save message to database
      const newMessage = new Message({
        senderId: data.senderId,
        message: data.message,
      });
      await newMessage.save();

      // Broadcast the message to all clients (including sender)
      io.emit('chat message', newMessage);
    } catch (error) {
      console.error('Error saving message:', error);
      socket.emit('error', 'Failed to save message');
    }
  });

  // Handle user joining (optional for future features)
  socket.on('user joined', (username: string) => {
    console.log(`${username} joined the chat`);
    socket.broadcast.emit('user joined', username);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
} 