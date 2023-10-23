import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPost from "./components/board/MainPost";
import PostDetail from "./components/board/PostDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPost />} />
        <Route path="/posts" element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
