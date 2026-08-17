import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// pure JS => document.getElementById('root')
// ความเป็น JSX อยู่ที่ createRoot().render() เพราะเราไม่สามารถส่ง tag html ex. <App/> ผ่าน JS ตรง ๆ ได้
