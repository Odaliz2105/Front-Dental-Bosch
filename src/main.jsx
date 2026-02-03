import React from "react"; // Librería principal de React
import ReactDOM from "react-dom/client"; // Método createRoot para React 18
import App from "./App.jsx"; // Componente raíz de la aplicación
import "./index.css"; // Estilos globales

ReactDOM.createRoot(document.getElementById("root")).render( // Punto de montaje de React
  <React.StrictMode> {/* Modo estricto solo en desarrollo */}
    <App /> {/* Componente principal */}
  </React.StrictMode>
);
