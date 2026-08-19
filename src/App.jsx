import Castle from "./component/01-Castle";

import { useContext } from "react";
import { MessageContext } from "./context/messageContext/MessageContext";

export default function App() {
  const { question, answer, handleQuestion } = useContext(MessageContext);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-800 text-white pb-80 py-10 gap-y-4">
      <p className="text-purple-300">
        Message for Secret Room:{" "}
        <span className="text-yellow-300">
          {/* ternory operator สำหรับทำ conditioning */}
          {/* ส่ง eventObject มา */}
          {question ? `✅ ${question}` : "🕰️ Waiting for a message...."}
        </span>
      </p>

      <textarea
        value={question}
        // Add event listener ดักจับ event change
        onChange={handleQuestion}
        className="bg-white text-black rounded px-2 py-1"
        placeholder="Type your message here...."
      />

      <p className="text-green-300">
        Reply from Secret Room :{""}
        <span className="text-yellow-300">
          {answer ? `✅ ${answer}` : "⏳ Waiting for a reply...."}
        </span>
      </p>

      {/* {} เสมือนประตูเข้าสู่โลก JS เพราะตอนนี้เราเขียน html อยู่ */}
      {/* ส่งตัวแปร question เข้าไปใน Castle */}
      {/* question คือการตั้งชื่อ key และ {คือค่าของตัวแปรที่เรา const เพื่อจะส่งเข้าไปเก็บใน object}*/}
      <Castle />
      {/* <Castle/> คือ react component */}
    </div>
  );
}
