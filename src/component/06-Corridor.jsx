import Gallery from "./07-Gallery";
import { useContext } from "react";
import { MessageContext } from "../context/messageContext/MessageContext";

export default function Corridor() {
  const { question } = useContext(MessageContext);

  return (
    <div className="flex flex-col justify-center items-center pt-10 rounded-xl bg-sky-800 text-white w-[90%]">
      <h1>Corridor</h1>
      <p className="text-purple-300">
        Message for Secret Room:{" "}
        <span className="text-yellow-300">
          {question ? `✅ ${question}` : "🕰️ Waiting for a message...."}
        </span>
      </p>

      {/* Render Gallery Here */}
      <Gallery />
    </div>
  );
}
