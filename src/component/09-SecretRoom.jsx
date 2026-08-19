import { useContext } from "react";
import { MessageContext } from "../context/messageContext/MessageContext";

export default function SecretRoom() {
  // เรียกใช้ context
  const { question, answer, handleAnswer } = useContext(MessageContext);

  return (
    <div className="flex flex-col justify-center items-center pt-10 rounded-xl bg-gray-700 text-white w-[90%]">
      <h1>SecretRoom</h1>

      <p className="text-purple-300">
        Message from the outside{" "}
        <span className="text-yellow-300">
          {question ? `✅ ${question}` : "🕰️ Waiting for a message...."}
        </span>
      </p>

      <textarea
        value={answer}
        onChange={handleAnswer}
        className="bg-white text-black rounded px-2 py-1"
        placeholder="Type your message here...."
      />

      <p className="text-green-300">
        Reply to the outside:{" "}
        <span className="text-yellow-300">
          {answer ? `✅ ${answer}` : "⏳ Waiting for a reply...."}
        </span>
      </p>
    </div>
  );
}
