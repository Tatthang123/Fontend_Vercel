import React, { useState, useRef, useEffect } from "react";
import { WebGeneratorContext } from "../contexts/WebGeneratorContext";

function WebGeneratorForm() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      content:
        "Xin chào,\nHãy bắt đầu thiết lập trang web của bạn.\nĐầu tiên, bạn muốn gọi trang web của mình là gì?",
    },
    { sender: "user", content: "web bán hàng quần áo" },
    {
      sender: "bot",
      content:
        "Cụ thể và rõ ràng.\nHãy cho tôi biết bạn muốn bán loại quần áo nào?",
    },
    { sender: "user", content: "Quần áo cho giới trẻ" },
    {
      sender: "bot",
      content:
        "Rất phù hợp với xu hướng!\nBạn đang tập trung vào kinh doanh trực tuyến hoặc cửa hàng vật lý?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setMessages([...messages, { sender: "user", content: inputValue }]);
      setInputValue("");

      // Simulate bot response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            content:
              "Cảm ơn bạn đã chia sẻ thông tin. Bạn có thêm ý tưởng nào cho trang web không?",
          },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br  rounded-xl shadow-lg">
      <div className="mb-6 flex items-center">
        <button className="text-indigo-600 font-semibold hover:text-indigo-800 transition duration-300">
          &lt; WIX
        </button>
        <button className="ml-auto text-indigo-600 hover:text-indigo-800 transition duration-300">
          Kết thúc trò chuyện và tiếp tục
        </button>
      </div>
      <div
        className="space-y-4 mb-6 max-h-[60vh] overflow-y-auto pr-4"
        style={{ scrollbarWidth: "thin" }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`w-3/4 p-4 rounded-xl backdrop-blur-md shadow-lg transition duration-300 ease-in-out ${
                message.sender === "user"
                  ? "bg-indigo-500 bg-opacity-70 hover:bg-opacity-80 text-white"
                  : "bg-white bg-opacity-40 hover:bg-opacity-50"
              }`}
            >
              {message.sender === "bot" && (
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mb-3 flex items-center justify-center shadow-md">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    ></path>
                  </svg>
                </div>
              )}
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Viết câu trả lời của bạn"
          className="flex-grow p-3 rounded-l-xl border-2 border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 bg-white bg-opacity-50 backdrop-blur-sm"
        />
        <button
          type="submit"
          className="bg-indigo-500 text-white p-3 rounded-r-xl hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </form>
      <div className="mt-6 flex justify-between text-sm text-indigo-600">
        <button className="hover:text-indigo-800 transition duration-300">
          Giúp tôi trả lời
        </button>
        <button className="hover:text-indigo-800 transition duration-300">
          Bỏ qua câu hỏi
        </button>
        <button className="flex items-center hover:text-indigo-800 transition duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
            />
          </svg>
          Kết thúc trò chuyện và tiếp tục
        </button>
      </div>
    </div>
  );
}

export default WebGeneratorForm;
