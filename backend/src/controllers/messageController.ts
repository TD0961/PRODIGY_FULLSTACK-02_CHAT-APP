import { Request, Response } from 'express';
import { Message } from '../models/Message';
import mongoose from 'mongoose';

// Get all messages
export const getMessages = async (req: Request, res: Response) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      res.json([]);
      return;
    }

    const messages = await Message.find().sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.json([]);
  }
};

// Create a new message
export const createMessage = async (req: Request, res: Response) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      res.status(503).json({ error: 'Database not available. Please try again later.' });
      return;
    }

    const { senderId, message } = req.body;
    const newMessage = new Message({ senderId, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create message' });
  }
}; 