import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

interface Message {
  _id: string;
  senderId: string;
  message: string;
  createdAt: string;
}

export function useSocket() {
  const socketRef = useRef<ReturnType<typeof io> | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Connect to the backend
    socketRef.current = io(SOCKET_URL);

    // Connection events
    socketRef.current.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
      setError(null);
      // Request message history
      socketRef.current?.emit('get messages');
    });

    socketRef.current.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
    });

    // Listen for message history
    socketRef.current.on('messages history', (history: Message[]) => {
      setMessages(history);
    });

    // Listen for incoming chat messages
    socketRef.current.on('chat message', (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Listen for errors
    socketRef.current.on('error', (errorMsg: string) => {
      setError(errorMsg);
    });

    // Clean up on unmount
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  // Function to send a message
  const sendMessage = (senderId: string, message: string) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('chat message', { senderId, message });
    }
  };

  return { messages, sendMessage, isConnected, error };
} 

