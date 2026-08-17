import { useEffect, useState } from "react"; // หากใช้ react hook ต้องเรียกใช้
import Castle from "./component/01-Castle";

export default function App() {
  // declare react's state variable
  // destructure คือการเอาของออกมา
  // สิ่งที่ useState แสดงออกมาคือ array ต้องมีชื่อตัวแปร ชื่อ function การที่เราเขียนแบบนี้คือเป็นการดึงตัวแปรออกมาและเป็นการตั้งชื่อไปในตัวด้วย
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    async function initPokemon() {
      try {
        // Fetch Pikachu
        const resPika = await fetch(
          "https://pokeapi.co/api/v2/pokemon/pikachu",
        );
        const dataPika = await resPika.json();

        // Fetch Random Prisnoer
        const ramdomID = Math.floor(Math.random() * 151) + 1;
        const resPrisoner = await fetch(
          "https://pokeapi.co/api/v2/pokemon/${randomId}",
        );
        const dataPrisoner = await resPrisoner.json();

        setPrisoner({
          id: dataPrisoner.id,
          name: dataPrisoner.name,
          sprite: dataPrisoner.sprites.front_default,
        });
      } catch (err) {
        console.error("API Load Failed", err);
      }
    }
    initPokemon();
  }, []);

  // ========== function ==========
  // e === eventObject ที่เรารับเข้ามาใน function นี้
  const handleQuestion = (e) => {
    console.log(e);
    setQuestion(e.target.value);
  };

  const handleAnswer = (e) => setAnswer(e.target.value);

  //console.log(useState);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-800 text-white pb-80 py-10 gap-y-4">
      <div>
        <p>Outside the Castle</p>
        <span> Pokemon outside: </span>
      </div>

      <p className="text-purple-300">
        Message for Secret Room:{" "}
        <span className="text-yellow-300">
          {/* ternory operator สำหรับทำ conditioning */}
          {/* ส่ง eventObject มา */}
          {question ? `✅ ${question}` : "🕰️ Waiting for a message...."}
        </span>
      </p>

      <textarea
        value={question}
        // Add event listener ดักจับ event change
        onChange={handleQuestion}
        className="bg-white text-black rounded px-2 py-1"
        placeholder="Type your message here...."
      />

      <p className="text-green-300">
        Reply from Secret Room :{""}
        <span className="text-yellow-300">
          {answer ? `✅ ${answer}` : "⏳ Waiting for a reply...."}
        </span>
      </p>

      {/* {} เสมือนประตูเข้าสู่โลก JS เพราะตอนนี้เราเขียน html อยู่ */}
      {/* ส่งตัวแปร question เข้าไปใน Castle */}
      {/* question คือการตั้งชื่อ key และ {คือค่าของตัวแปรที่เรา const เพื่อจะส่งเข้าไปเก็บใน object}*/}
      <Castle question={question} answer={answer} handleAnswer={handleAnswer} />
      {/* <Castle/> คือ react component */}
    </div>
  );
}
