import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Workbench from "./pages/Workbench";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Direct to Sovereign Workbench Application (Offline Air-Gapped) */}
          <Route path="/" element={<Workbench initialView="chat" />} />

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
    </ThemeProvider>
  );
}

export default App;
