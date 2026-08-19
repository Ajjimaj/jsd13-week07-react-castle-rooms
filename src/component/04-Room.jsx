import Hall from "./05-Hall";

export default function Room({
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
    <div className="flex flex-col justify-center items-center pt-6 rounded-xl bg-emerald-600 text-white w-[96%] p-3 my-2 shadow-md">
      <h1 className="text-lg font-bold mb-1">Room</h1>

      <p className="text-purple-200 text-xs mb-3">
        Message for Secret Room:
        <span className="text-yellow-300 font-semibold">
          {question ? `✅ ${question}` : "🕰️ Waiting for a message...."}
        </span>
      </p>

      <Hall
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
