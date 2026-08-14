import Chamber from "./03-Chamber";

export default function Tower({ question, answer, handleAnswer }) {
  return (
    <div className="flex flex-col justify-center items-center pt-10 rounded-xl bg-orange-500 text-white w-[90%]">
      <h1>Tower</h1>

      <p className="text-purple-300">
        Message for Secret Room:{" "}
        <span className="text-yellow-300">
          {question ? `✅ ${question}` : "🕰️ Waiting for a message...."}
        </span>
      </p>

      {/* Render Chamber here */}
      <Chamber
        question={question}
        answer={answer}
        handleAnswer={handleAnswer}
      />
    </div>
  );
}
