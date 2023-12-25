import React, { useEffect, useState } from 'react';

export default function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:3500/events');
    eventSource.onmessage = (event) => {
      const message = event.data;
      setMessages((prevMessages) => [...prevMessages, message]);
    };
    eventSource.onerror = () => {
      eventSource.close(); 
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h1>Test SSE</h1>
      <h3>if this is working, you should see messages below</h3>
      {messages.map((msg, index) => (
        <p key={index}>{msg}</p>
      ))}
    </div>
  );
}
