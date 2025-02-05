import React from "react";

const Message = ({ message, isOwnMessage }) => {
  return (
    <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      <div
        className={`p-3 rounded-lg max-w-xs ${
          isOwnMessage
            ? "bg-blue-500 text-white self-end"
            : "bg-gray-800 text-white self-start"
        }`}
      >
        <strong>{message.username}: </strong>
        <span>{message.text}</span>
      </div>
    </div>
  );
};

export default Message;
