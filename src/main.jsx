import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { MessageProvider } from "./context/MessageContext/MessageProvider.jsx";

createRoot(document.getElementById("root")).render(
  <MessageProvider>
    <App />
  </MessageProvider>,
);

// pure JS => document.getElementById('root')
// ความเป็น JSX อยู่ที่ createRoot().render() เพราะเราไม่สามารถส่ง tag html ex. <App/> ผ่าน JS ตรง ๆ ได้
