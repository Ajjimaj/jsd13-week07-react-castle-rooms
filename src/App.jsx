import { useState, useEffect } from "react";
import Castle from "./component/01-Castle";

export default function App() {
  // State variables for communication
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // State variables for Escape Pod Challenge & Pokemon
  const [starterPokemon, setStarterPokemon] = useState([]);
  const [prisoner, setPrisoner] = useState(null);
  const [rescuePokemon, setRescuePokemon] = useState([]);
  const [gamePhase, setGamePhase] = useState("idle");
  // Phases: "idle" | "signaled" | "reinforcements" | "building" | "pod_built" | "pod_in_room" | "boarded" | "escaped"
  const [podProgress, setPodProgress] = useState(0);
  const [showBuildModal, setShowBuildModal] = useState(false);
  const [_loadError, setLoadError] = useState(false);

  // Handlers for input fields
  const handleQuestion = (e) => setQuestion(e.target.value);
  const handleAnswer = (e) => setAnswer(e.target.value);

  // -------------------------------------------------------------
  // useEffect Stage 1: Initial Fetching on Component Mount ([])
  // -------------------------------------------------------------
  useEffect(() => {
    async function initPokemon() {
      try {
        // Fetch Pikachu for Outside
        const resPika = await fetch(
          "https://pokeapi.co/api/v2/pokemon/pikachu",
        );
        const dataPika = await resPika.json();
        setStarterPokemon([
          {
            id: 25,
            name: "Pikachu",
            sprite:
              dataPika.sprites?.front_default ||
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
          },
        ]);

        // Fetch Random Prisoner (Gen 1: ID 1-151) for SecretRoom
        const randomId = Math.floor(Math.random() * 151) + 1;
        const resPrisoner = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${randomId}`,
        );
        const dataPrisoner = await resPrisoner.json();
        setPrisoner({
          id: dataPrisoner.id,
          name:
            dataPrisoner.name.charAt(0).toUpperCase() +
            dataPrisoner.name.slice(1),
          sprite:
            dataPrisoner.sprites?.front_default ||
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomId}.png`,
        });
      } catch (err) {
        console.warn("API Fetch failed, using fallback sprites:", err);
        setLoadError(true);
        // Fallback data if offline or API blocked
        setStarterPokemon([
          {
            id: 25,
            name: "Pikachu",
            sprite:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
          },
        ]);
        const fallbackId = Math.floor(Math.random() * 151) + 1;
        setPrisoner({
          id: fallbackId,
          name: `Pokemon #${fallbackId}`,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${fallbackId}.png`,
        });
      }
    }

    initPokemon();
  }, []); // Empty dependency array -> runs ONLY ONCE when app mounts

  // -------------------------------------------------------------
  // useEffect Stage 2: React to State Change ([answer, gamePhase])
  // Listen for "help" in answer to activate "signaled" phase
  // -------------------------------------------------------------
  useEffect(() => {
    if (answer.toLowerCase().includes("help") && gamePhase === "idle") {
      setGamePhase("signaled");
    }
  }, [answer, gamePhase]);

  // -------------------------------------------------------------
  // useEffect Stage 4: Timer Interval for Building Escape Pod ([gamePhase])
  // -------------------------------------------------------------
  useEffect(() => {
    let timer = null;
    if (gamePhase === "building") {
      setPodProgress(0);
      timer = setInterval(() => {
        setPodProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(timer);
            setShowBuildModal(false);
            setGamePhase("pod_built");
            return 100;
          }
          return prevProgress + 4;
        });
      }, 80);
    }

    // Cleanup function: clears interval if component unmounts or phase changes
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gamePhase]);

  // Stage 3 Handler: Call for Reinforcements
  const handleCallReinforcements = async () => {
    try {
      // Fetch Bulbasaur (1), Charmander (4), Squirtle (7)
      const starterIds = [1, 4, 7];
      const promises = starterIds.map((id) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
          res.json(),
        ),
      );
      const results = await Promise.all(promises);

      const newStarters = results.map((p) => ({
        id: p.id,
        name: p.name.charAt(0).toUpperCase() + p.name.slice(1),
        sprite: p.sprites?.front_default,
      }));

      setStarterPokemon((prev) => [...prev, ...newStarters]);
    } catch (err) {
      console.warn("Error fetching starters, using fallbacks", err);
      const fallbacks = [
        {
          id: 1,
          name: "Bulbasaur",
          sprite:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        },
        {
          id: 4,
          name: "Charmander",
          sprite:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
        },
        {
          id: 7,
          name: "Squirtle",
          sprite:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
        },
      ];
      setStarterPokemon((prev) => [...prev, ...fallbacks]);
    }
    setGamePhase("reinforcements");
  };

  // Stage 4 Handler: Trigger Build Modal
  const handleStartBuildPod = () => {
    setShowBuildModal(true);
    setGamePhase("building");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-slate-900 text-white pb-20 py-10 gap-y-4 px-4 font-sans">
      {/* ========================================================= */}
      {/* OUTSIDE THE CASTLE UI HEADER                              */}
      {/* ========================================================= */}
      <h1 className="text-3xl font-extrabold text-amber-400">
        Outside the Castle
      </h1>

      {/* Pokemon Outside List */}
      <div className="flex flex-col items-center">
        <p className="text-gray-300 text-sm mb-2">Pokemon outside:</p>
        <div className="flex items-center gap-4 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
          {starterPokemon.map((poke) => (
            <div key={poke.id} className="flex flex-col items-center">
              <img
                src={poke.sprite}
                alt={poke.name}
                className="w-12 h-12 object-contain"
              />
              <span className="text-xs text-gray-200 mt-1 font-medium">
                {poke.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stage 2 Action: Signal received */}
      {gamePhase === "signaled" && (
        <div className="flex flex-col items-center gap-2 my-2 animate-bounce">
          <p className="text-yellow-400 font-semibold text-sm">
            Help signal received from inside!
          </p>
          <button
            onClick={handleCallReinforcements}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-lg shadow-lg cursor-pointer transition transform active:scale-95"
          >
            Call for Reinforcements!
          </button>
        </div>
      )}

      {/* Stage 3 Action: Build Pod Button */}
      {gamePhase === "reinforcements" && (
        <div className="my-2">
          <button
            onClick={handleStartBuildPod}
            className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2.5 px-6 rounded-lg shadow-lg cursor-pointer transition transform active:scale-95"
          >
            Build Escape Pod!
          </button>
        </div>
      )}

      {/* Stage 4 UI: Escape Pod Built Outside */}
      {gamePhase === "pod_built" && (
        <div className="flex flex-col items-center gap-2 my-2 border-2 border-yellow-400/80 bg-slate-800/90 p-4 rounded-xl shadow-xl">
          <p className="text-gray-200 text-sm font-medium">
            All aboard the Escape Pod!
          </p>
          <div className="flex gap-4">
            {starterPokemon.map((poke) => (
              <div key={poke.id} className="flex flex-col items-center">
                <img
                  src={poke.sprite}
                  alt={poke.name}
                  className="w-10 h-10 object-contain"
                />
                <span className="text-xs text-gray-300">{poke.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Communication Panel Outside */}
      <div className="flex flex-col items-center gap-2 w-full max-w-md bg-slate-800 p-4 rounded-xl border border-slate-700">
        <p className="text-purple-300 text-sm font-medium">
          Message to the Secret Room:{" "}
          <span className="text-yellow-300 font-semibold">
            {question ? `✅ ${question}` : "Waiting..."}
          </span>
        </p>

        <textarea
          value={question}
          onChange={handleQuestion}
          className="w-full bg-white text-black rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none h-16"
          placeholder="Type your message here..."
        />

        <p className="text-emerald-400 text-sm font-medium">
          Reply from the Secret Room:{" "}
          <span className="text-yellow-300 font-semibold">
            {answer ? answer : "Waiting for a reply..."}
          </span>
        </p>
      </div>

      {/* ========================================================= */}
      {/* STAGE 4 MODAL: BUILDING ESCAPE POD PROGRESS               */}
      {/* ========================================================= */}
      {showBuildModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-slate-800 border-2 border-amber-400 rounded-2xl p-6 w-80 flex flex-col items-center shadow-2xl gap-4">
            <h3 className="text-amber-400 font-bold text-lg">
              Building Escape Pod...
            </h3>
            <div className="w-full bg-slate-700 h-6 rounded-full overflow-hidden p-1 border border-slate-600">
              <div
                className="bg-amber-400 h-full rounded-full transition-all duration-100 ease-out"
                style={{ width: `${podProgress}%` }}
              />
            </div>
            <span className="text-white font-extrabold text-xl">
              {podProgress}%
            </span>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* CASTLE ROOM HIERARCHY (PROP DRILLING TO SECRET ROOM)       */}
      {/* ========================================================= */}
      <Castle
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
