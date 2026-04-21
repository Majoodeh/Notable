import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreateNote from "./pages/CreateNote";
import NoteDetailPage from "./pages/NoteDetailPage";

const App = () => {
  return (
    <div
      data-theme="retro"
      className="bg-base-100 min-h-screen text-base-content"
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateNote />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
