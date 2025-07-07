import { useState } from 'react';
import { useSocket } from '../hooks/useSocket';

export default function ChatBox() {
  const { messages, sendMessage } = useSocket();
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow bg-white">
      <h2 className="text-xl font-bold mb-4">Chat Room</h2>
      <div className="h-64 overflow-y-auto mb-4 border p-2 bg-gray-50 rounded">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-2">
            <span className="font-mono text-xs text-gray-400">{msg.id.slice(-4)}:</span>
            <span className="ml-2">{msg.message}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="flex-1 border rounded px-2 py-1 focus:outline-none focus:ring"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
} 