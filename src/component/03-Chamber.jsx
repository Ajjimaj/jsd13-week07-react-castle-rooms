import Room from "./04-Room";
import { useContext } from "react";
import { MessageContext } from "../context/messageContext/MessageContext";

export default function Chamber() {
  const { question } = useContext(MessageContext);

  return (
    <div className="flex flex-col justify-center items-center pt-10 rounded-xl bg-yellow-500 w-[90%]">
      <h1>Chamber</h1>
      <p className="text-purple-300">
        Message for Secret Room:{" "}
        <span className="text-yellow-300">
          {question ? `✅ ${question}` : "🕰️ Waiting for a message...."}
        </span>
      </p>

      <Room />
    </div>
  );
}
