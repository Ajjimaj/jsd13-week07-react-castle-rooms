import Nook from "./08-Nook";

export default function Gallery({ question, answer, handleAnswer }) {
  return (
    <div className="flex flex-col justify-center items-center pt-10 rounded-xl bg-blue-800 text-white w-[90%]">
      <h1>Gallery</h1>

      <p className="text-purple-300">
        Message for Secret Room:{" "}
        <span className="text-yellow-300">
          {question ? `✅ ${question}` : "🕰️ Waiting for a message...."}
        </span>
      </p>

      {/* Render Nook Here */}
      <Nook question={question} answer={answer} handleAnswer={handleAnswer} />
    </div>
  );
}
