import { useState } from 'react';
import { useSocket } from '../hooks/useSocket';
import { useAuth } from '../contexts/AuthContext';

export default function RealTimeChat() {
  const [input, setInput] = useState('');
  const { messages, sendMessage, isConnected, error } = useSocket();
  const { user, logout } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !isConnected || !user) return;
    
    sendMessage(user.username, input);
    setInput('');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-pink-900 to-red-900">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 text-center">
          <div className="text-white text-lg font-medium">Please log in to access the chat.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animate-float"></div>
        <div className="absolute top-10 right-20 w-48 h-48 bg-pink-500 rounded-full mix-blend-multiply filter blur-lg opacity-40 animate-blob animation-delay-2000 animate-float animation-delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-56 h-56 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-blob animation-delay-4000 animate-float animation-delay-3000"></div>
        
        {/* Additional floating elements */}
        <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-indigo-400 rounded-full mix-blend-multiply filter blur-lg opacity-30 animate-float animation-delay-2000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-cyan-400 rounded-full mix-blend-multiply filter blur-md opacity-35 animate-float animation-delay-1000"></div>
        
        {/* Shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent animate-shimmer"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-6">
        {/* Enhanced Header */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center animate-pulse shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-display">
                  Real-time Chat
                </h1>
                <p className="text-purple-200 text-base font-medium">Connect with others instantly</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-white font-semibold text-lg">Welcome, {user.username}!</span>
                <div className="text-purple-200 text-sm font-medium">Ready to chat</div>
              </div>
              <button
                onClick={logout}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-2xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Connection Status & Error */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className={`w-4 h-4 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
              <span className={`text-base font-semibold ${isConnected ? 'text-green-300' : 'text-red-300'}`}>
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
              {isConnected && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-300 text-sm font-medium">Live</span>
                </div>
              )}
            </div>
            <div className="text-purple-200 text-base font-medium">
              {messages.length} message{messages.length !== 1 ? 's' : ''}
            </div>
          </div>

          {/* Enhanced Error Display */}
          {error && (
            <div className="p-4 bg-red-500/20 border border-red-400/30 rounded-2xl backdrop-blur-sm mb-6">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-400 mr-3 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-red-200 text-sm font-medium">{error}</span>
              </div>
            </div>
          )}

          {/* Enhanced Messages Display */}
          <div className="h-96 overflow-y-auto mb-6 bg-white/5 rounded-3xl p-6 border border-white/10">
            {messages.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl mx-auto mb-6 flex items-center justify-center animate-pulse shadow-lg">
                  <svg className="w-10 h-10 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="text-purple-200 text-xl font-semibold mb-2">
                  {isConnected ? 'No messages yet' : 'Connecting...'}
                </p>
                <p className="text-purple-300 text-base">
                  {isConnected ? 'Start the conversation!' : 'Please wait while we connect'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div key={msg._id} className="flex items-start gap-4 group" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0 animate-pulse shadow-lg">
                      <span className="text-white text-sm font-bold">
                        {msg.senderId.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-purple-200 font-semibold text-base">{msg.senderId}</span>
                        <span className="text-purple-400 text-sm font-medium">
                          {new Date(msg.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="bg-white/5 backdrop-blur-xl rounded-2xl px-5 py-3 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg">
                        <p className="text-white text-base leading-relaxed">{msg.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Enhanced Message Input */}
          <form onSubmit={handleSubmit} className="flex gap-4">
            <div className="flex-1 relative group">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={isConnected ? "Type your message..." : "Connecting..."}
                disabled={!isConnected}
                className="w-full pl-5 pr-16 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 disabled:opacity-50 hover:bg-white/15 hover:border-white/30 text-base"
              />
              <button
                type="submit"
                disabled={!isConnected || !input.trim()}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-xl hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Responsive adjustments */}
      <div className="hidden lg:block absolute top-10 right-10 text-white/20 text-sm animate-pulse">
        <div className="text-center">
          <div className="w-3 h-3 bg-purple-400 rounded-full mx-auto mb-2 animate-pulse"></div>
          <span className="text-xs font-medium">Live Chat</span>
        </div>
      </div>
    </div>
  );
} 