import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Message from "./Message";
import InputBox from "./InputBox";

const socket = io("http://localhost:5000");

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState(
    "User" + Math.floor(Math.random() * 1000)
  ); // Generate random user
  const chatEndRef = useRef(null);

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => socket.off();
  }, []);

  // Auto-scroll to bottom when new message is added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full p-4">
      {/* Messages List */}
      <div className="flex-1 overflow-y-auto space-y-2 p-4 bg-gray-900">
        {messages.map((msg, index) => (
          <Message
            key={index}
            message={msg}
            isOwnMessage={msg.username === username}
          />
        ))}
        <div ref={chatEndRef} /> {/* Empty div to keep chat at bottom */}
      </div>
      {/* Input Box */}
      <InputBox socket={socket} username={username} />
    </div>
  );
};

export default ChatBox;
