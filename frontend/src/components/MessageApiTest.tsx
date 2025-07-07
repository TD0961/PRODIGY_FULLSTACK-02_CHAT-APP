import { useEffect, useState } from 'react';

interface Message {
  _id: string;
  senderId: string;
  message: string;
  createdAt: string;
}

export default function MessageApiTest() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [senderId, setSenderId] = useState('user1');
  const [loading, setLoading] = useState(false);

  // Fetch messages on mount
  useEffect(() => {
    fetch('/api/messages')
      .then(res => res.json())
      .then(setMessages);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ senderId, message: input })
    });
    const newMsg = await res.json();
    setMessages(msgs => [...msgs, newMsg]);
    setInput('');
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow bg-white">
      <h2 className="text-xl font-bold mb-4">REST API Message Test</h2>
      <div className="mb-2">
        <label className="text-xs">Sender ID: </label>
        <input
          className="border rounded px-2 py-1 text-xs"
          value={senderId}
          onChange={e => setSenderId(e.target.value)}
        />
      </div>
      <div className="h-64 overflow-y-auto mb-4 border p-2 bg-gray-50 rounded">
        {messages.map(msg => (
          <div key={msg._id} className="mb-2">
            <span className="font-mono text-xs text-gray-400">{msg.senderId}:</span>
            <span className="ml-2">{msg.message}</span>
            <span className="ml-2 text-xs text-gray-300">({new Date(msg.createdAt).toLocaleTimeString()})</span>
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
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
} 