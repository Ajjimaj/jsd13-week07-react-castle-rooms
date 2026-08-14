import Corridor from "./06-Corridor";

export default function Hall({ question, answer, handleAnswer }) {
  return (
    <div className="flex flex-col justify-center items-center pt-10 rounded-xl bg-green-800 text-white w-[90%]">
      <h1>Hall</h1>
      <p className="text-purple-300">
        Message for Secret Room:{" "}
        <span className="text-yellow-300">
          {question ? `✅ ${question}` : "🕰️ Waiting for a message...."}
        </span>
      </p>

      {/* Render Corridor Here */}
      <Corridor
        question={question}
        answer={answer}
        handleAnswer={handleAnswer}
      />
    </div>
  );
}
