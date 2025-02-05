import React, { useState } from "react";

const InputBox = ({ socket, username }) => {
  const [text, setText] = useState("");

  const sendMessage = () => {
    if (text.trim()) {
      socket.emit("sendMessage", { username, text });
      setText("");
    }
  };

  return (
    <div className="flex space-x-2 p-2 bg-gray-800">
      <input
        type="text"
        placeholder="Type a message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 p-2 bg-gray-700 text-white rounded"
        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
      />
      <button
        onClick={sendMessage}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Send
      </button>
    </div>
  );
};

export default InputBox;
