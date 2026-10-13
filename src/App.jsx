
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/projects" element={<Projects />} />

        <Route
          path="/projects/:id"
          element={<ProjectDetail />}
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
