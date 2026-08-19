import { Children } from "react";
import { useState } from "react";
import { MessageContext } from "./MessageContext";

export const MessageProvider = ({ children }) => {
  // destructure คือการเอาของออกมา
  // สิ่งที่ useState แสดงออกมาคือ array ต้องมีชื่อตัวแปร ชื่อ function การที่เราเขียนแบบนี้คือเป็นการดึงตัวแปรออกมาและเป็นการตั้งชื่อไปในตัวด้วย
  const [question, setQuestion] = useState("");

  const [answer, setAnswer] = useState("");

  // e === eventObject ที่เรารับเข้ามาใน function นี้
  const handleQuestion = (e) => {
    console.log(e);
    setQuestion(e.target.value);
  };

  const handleAnswer = (e) => setAnswer(e.target.value);
  // use children ที่เป็น reserve word
  // ส่ง props เข้าไปใน key ที่ชื่อว่า value และส่งตัวแปรมาใน value ได้เลย
  return (
    <MessageContext.Provider
      // App.jsx และ component ที่เป็น children ของ App ที่เป็น component แม่ สามารถเรียกใช้ตัวแปรเหล่านี้ได้
      value={{ question, answer, handleQuestion, handleAnswer }}
      // วิธีเขียนอีกวิธีหนึ่งก็คือเขียนเป็น key: value
      // ใช้ในกรณีที่ key กับ value มีค่าไม่เหมือนกัน แต่ถ้าค่าเหมือนกันเขียนย่อได้เลย shorthand เพราะเป็นความตั้งใจของ react ที่ต้องการให้ experience การเขียน code สะดวกขึ้น
      // question: question,
      // answer: answer,
      // handleQuestion: handleQuestion
      // handleAnswer: handleAnswer
    >
      {children}
    </MessageContext.Provider>
  );
};
