import Tower from "./02-Tower";
import { useContext } from "react";
import { MessageContext } from "../context/messageContext/MessageContext";

export default function Castle() {
  const { question } = useContext(MessageContext);

  return (
    <div className="flex flex-col justify-center items-center pt-10 bg-red-500 text-white w-full rounded-xl">
      <h1>Castle</h1>
      <p className="text-purple-300">
        Message for Secret Room:{" "}
        <span className="text-yellow-300">
          {/* key.value */}
          {question ? `✅ ${question}` : "🕰️ Waiting for a message...."}
        </span>
      </p>

      {/* <p className="text-purple-300">
        Message for Secret Room:{" "}
        <span className="text-yellow-300">
          {answer ? `✅ ${answer}` : "🕰️ Waiting for a message...."}
        </span>
      </p> */}

      {/* Render tower here */}
      <Tower />
    </div>
  );
}
