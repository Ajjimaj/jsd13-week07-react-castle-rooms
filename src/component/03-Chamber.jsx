import Room from "./04-Room";

export default function Chamber({ question, answer, handleAnswer }) {
  return (
    <div className="flex flex-col justify-center items-center pt-10 rounded-xl bg-yellow-500 w-[90%]">
      <h1>Chamber</h1>
      <p className="text-purple-300">
        Message for Secret Room:{" "}
        <span className="text-yellow-300">
          {question ? `✅ ${question}` : "🕰️ Waiting for a message...."}
        </span>
      </p>

      <Room question={question} answer={answer} handleAnswer={handleAnswer} />
    </div>
  );
}
