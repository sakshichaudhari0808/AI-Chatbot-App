import React, { useState } from 'react';

function App() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I am your AI assistant running on a Node.js backend environment. Ask me anything!' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();

      setMessages((prev) => [...prev, { sender: 'bot', text: data.reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: 'bot', text: '❌ Error: Failed to connect to the backend execution loop.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'sans-serif', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <div style={{ background: '#0070f3', color: 'white', padding: '15px', textAlign: 'center', fontWeight: 'bold' }}>
        🤖 AI Chat Assistant Sandbox
      </div>
      
      <div style={{ height: '40px', padding: '15px', overflowY: 'auto', background: '#f9f9f9', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{
            alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            background: msg.sender === 'user' ? '#0070f3' : '#e5e5ea',
            color: msg.sender === 'user' ? 'white' : 'black',
            padding: '10px 14px',
            borderRadius: '16px',
            maxWidth: '70%'
          }}>
            {msg.text}
          </div>
        ))}
        {isTyping && <div style={{ alignSelf: 'flex-start', color: '#888', fontStyle: 'italic' }}>AI is conceptualizing responses...</div>}
      </div>

      <form onSubmit={handleSendMessage} style={{ display: 'flex', borderTop: '1px solid #ddd' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask the AI a question..."
          style={{ flex: 1, padding: '15px', border: 'none', outline: 'none' }}
        />
        <button type="submit" style={{ padding: '0 25px', background: '#0070f3', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
          Send
        </button>
      </form>
    </div>
  );
}

export default App;
