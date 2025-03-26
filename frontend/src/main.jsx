import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { App } from "./App.jsx";
import { Player } from "./pages/Player.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/player" element={<Player />} />
    </Routes>
  </BrowserRouter>
);
