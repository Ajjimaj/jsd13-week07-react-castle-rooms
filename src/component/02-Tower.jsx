import Chamber from "./03-Chamber";

export default function Tower({
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
    <div className="flex flex-col justify-center items-center pt-6 rounded-xl bg-orange-500 text-white w-[96%] p-3 my-2 shadow-md">
      <h1 className="text-lg font-bold mb-1">Tower</h1>

      <p className="text-purple-200 text-xs mb-3">
        Message for Secret Room:
        <span className="text-yellow-300 font-semibold">
          {question ? `✅ ${question}` : "🕰️ Waiting for a message...."}
        </span>
      </p>

      <Chamber
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
