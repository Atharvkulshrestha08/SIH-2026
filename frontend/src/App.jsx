import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Workbench from "./pages/Workbench";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page stays untouched at / */}
        <Route path="/" element={<LandingPage />} />

        {/* Workbench Application routes */}
        <Route path="/workbench" element={<Workbench initialView="chat" />} />
        <Route path="/chat" element={<Workbench initialView="chat" />} />
        <Route path="/tasks" element={<Workbench initialView="tasks" />} />
        <Route path="/documents" element={<Workbench initialView="documents" />} />
        <Route path="/knowledge" element={<Workbench initialView="knowledge" />} />
        <Route path="/files" element={<Workbench initialView="files" />} />
        <Route path="/audit" element={<Workbench initialView="audit" />} />
        <Route path="/status" element={<Workbench initialView="status" />} />
        <Route path="/models" element={<Workbench initialView="models" />} />
        <Route path="/sandbox" element={<Workbench initialView="sandbox" />} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
