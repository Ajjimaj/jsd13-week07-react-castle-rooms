import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function SecretRoom({
  question,
  answer,
  handleAnswer,
  prisoner,
  starterPokemon,
  gamePhase,
  setGamePhase,
}) {
  // Trigger confetti when prisoner successfully escapes
  useEffect(() => {
    if (gamePhase === "escaped") {
      // Main confetti launch
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
      });

      // Side confetti fireworks burst
      const end = Date.now() + 3 * 1000;
      const interval = setInterval(() => {
        if (Date.now() > end) {
          return clearInterval(interval);
        }
        confetti({
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          origin: { x: Math.random(), y: Math.random() - 0.2 },
        });
      }, 350);

      return () => clearInterval(interval);
    }
  }, [gamePhase]);

  // Handler: Bring Pod to Secret Room
  const handleCallPod = () => {
    setGamePhase("pod_in_room");
  };

  // Handler: Prisoner enters pod
  const handleEnterPod = () => {
    setGamePhase("boarded");
  };

  // Handler: Transport outside & complete escape!
  const handleTransportOutside = () => {
    setGamePhase("escaped");
  };

  const isEscaped = gamePhase === "escaped";

  return (
    <div className="relative flex justify-between items-stretch rounded-2xl bg-slate-800 text-white w-[96%] my-2 border border-slate-700 shadow-xl overflow-hidden min-h-80">
      {/* Center Content */}
      <div className="flex-1 flex flex-col justify-center items-center pt-6 p-5 gap-4">
        <h1 className="text-xl font-extrabold text-gray-200">SecretRoom</h1>

        {/* ========================================================= */}
        {/* PRISONER CARD / ESCAPED STATUS                            */}
        {/* ========================================================= */}
        {!isEscaped ? (
          <div className="border-2 border-red-500/90 bg-slate-900/90 rounded-2xl p-4 w-64 flex flex-col items-center shadow-lg">
            <p className="text-red-400 font-bold text-sm mb-2">
              {gamePhase === "boarded"
                ? "Entering the pod..."
                : "A prisoner is trapped here!"}
            </p>
            {prisoner && (
              <div className="flex flex-col items-center">
                <img
                  src={prisoner.sprite}
                  alt={prisoner.name}
                  className="w-16 h-16 object-contain filter grayscale contrast-125"
                />
                <span className="text-xs text-gray-300 mt-1 font-semibold">
                  {prisoner.name}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1 my-2">
            <p className="text-emerald-400 font-extrabold text-base">
              The prisoner has escaped!
            </p>
            <span className="text-gray-400 text-xs">
              The Secret Room is empty.
            </span>
          </div>
        )}

        {/* ========================================================= */}
        {/* STAGE 5 & 6-8 ESCAPE POD IN SECRET ROOM                    */}
        {/* ========================================================= */}
        {gamePhase === "pod_built" && (
          <div className="flex flex-col items-center gap-2">
            <p className="text-purple-300 text-xs">
              You sense something waiting just outside...
            </p>
            <button
              onClick={handleCallPod}
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-5 rounded-lg shadow-md transition cursor-pointer active:scale-95 text-xs"
            >
              Call the Pod!
            </button>
          </div>
        )}

        {(gamePhase === "pod_in_room" || gamePhase === "boarded") && (
          <div className="border-2 border-amber-400/90 bg-slate-900/90 p-4 rounded-xl flex flex-col items-center gap-3 w-full max-w-sm">
            <p className="text-amber-400 font-bold text-xs">
              The Escape Pod is here!
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {starterPokemon.map((poke) => (
                <div key={poke.id} className="flex flex-col items-center">
                  <img
                    src={poke.sprite}
                    alt={poke.name}
                    className="w-9 h-9 object-contain"
                  />
                  <span className="text-[10px] text-gray-300">{poke.name}</span>
                </div>
              ))}
              {gamePhase === "boarded" && prisoner && (
                <div className="flex flex-col items-center">
                  <img
                    src={prisoner.sprite}
                    alt={prisoner.name}
                    className="w-9 h-9 object-contain"
                  />
                  <span className="text-[10px] text-emerald-400 font-bold">
                    {prisoner.name} ✓
                  </span>
                </div>
              )}
            </div>

            {gamePhase === "pod_in_room" && (
              <button
                onClick={handleEnterPod}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-1.5 px-4 rounded-lg shadow cursor-pointer text-xs transition active:scale-95 mt-1"
              >
                Enter the Pod!
              </button>
            )}

            {gamePhase === "boarded" && (
              <button
                onClick={handleTransportOutside}
                className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold py-2 px-5 rounded-lg shadow cursor-pointer text-xs transition active:scale-95 mt-1"
              >
                Transport Outside!
              </button>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* SECRET ROOM COMMUNICATION PANEL                           */}
        {/* ========================================================= */}
        <div className="flex flex-col items-center gap-2 w-full max-w-md mt-2">
          <p className="text-purple-300 text-xs font-medium">
            Message from outside:{" "}
            <span className="text-yellow-300 font-semibold">
              {question ? `✅ ${question}` : "Waiting for a message..."}
            </span>
          </p>

          <textarea
            value={answer}
            onChange={handleAnswer}
            className="w-full bg-white text-black rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none h-16"
            placeholder="Type your reply here..."
          />

          <p className="text-emerald-400 text-xs font-medium">
            Your reply:{" "}
            <span className="text-yellow-300 font-semibold">
              {answer ? answer : "..."}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
