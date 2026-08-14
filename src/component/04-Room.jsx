import Hall from "./05-Hall";

export default function Room({ question, answer, handleAnswer }) {
  return (
    <div className="flex flex-col justify-center items-center pt-10 rounded-xl bg-green-500 text-white w-[90%]">
      <h1>Room</h1>
      <p className="text-purple-300">
        Message for Secret Room:{" "}
        <span className="text-yellow-300">
          {question ? `✅ ${question}` : "🕰️ Waiting for a message...."}
        </span>
      </p>

      <Hall question={question} answer={answer} handleAnswer={handleAnswer} />
    </div>
  );
}
