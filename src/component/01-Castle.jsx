import Tower from "./02-Tower";

export default function Castle({
  question,
  answer,
  handleAnswer,
  prisoner,
  starterPokemon,
  gamePhase,
  setGamePhase,
  rescuePokemon,
  setRescuePokemon,
}) {
  return (
    <div className="flex flex-col justify-center items-center pt-8 bg-red-600 text-white w-full rounded-2xl p-4 my-4 shadow-xl">
      <h1 className="text-xl font-bold mb-2">Castle</h1>
      <p className="text-purple-200 text-xs mb-4">
        Message for Secret Room:{" "}
        <span className="text-yellow-300 font-semibold">
          {question ? `✅ ${question}` : "🕰️ Waiting for a message...."}
        </span>
      </p>

      <Tower
        question={question}
        answer={answer}
        handleAnswer={handleAnswer}
        prisoner={prisoner}
        starterPokemon={starterPokemon}
        gamePhase={gamePhase}
        setGamePhase={setGamePhase}
        rescuePokemon={rescuePokemon}
        setRescuePokemon={setRescuePokemon}
      />
    </div>
  );
}
