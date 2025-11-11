import "./App.css"
import AppRoutes from "../../navegacao-app/src/routes/AppRoutes.jsx";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}