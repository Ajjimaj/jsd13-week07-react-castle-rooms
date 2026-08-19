import Hall from "./05-Hall";
import { useContext } from "react";
import { MessageContext } from "../context/messageContext/MessageContext";

export default function Room() {
  const { question } = useContext(MessageContext);

  return (
    <div className="flex flex-col justify-center items-center pt-10 rounded-xl bg-green-500 text-white w-[90%]">
      <h1>Room</h1>
      <p className="text-purple-300">
        Message for Secret Room:{" "}
        <span className="text-yellow-300">
          {question ? `✅ ${question}` : "🕰️ Waiting for a message...."}
        </span>
      </p>

      <Hall />
    </div>
  );
}
