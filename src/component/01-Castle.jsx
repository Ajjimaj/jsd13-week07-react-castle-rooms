import Tower from "./02-Tower";

export default function Castle({ question, answer, handleAnswer }) {
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
      <Tower question={question} answer={answer} handleAnswer={handleAnswer} />
    </div>
  );
}
