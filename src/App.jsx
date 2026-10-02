import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";


import Navbar from "./components/Navbar";


import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";


import {
  getCurrentUser
} from "./utils/localStorage";


function ProtectedRoute({
  children
}) {

  const currentUser =
    getCurrentUser();


  if (!currentUser) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }


  return children;

}


function App() {

  return (

    <BrowserRouter>

      <Navbar />


      <Routes>


        {/* LOGIN */}

        <Route
          path="/login"
          element={
            <Login />
          }
        />


        {/* REGISTER */}

        <Route
          path="/register"
          element={
            <Register />
          }
        />


        {/* DASHBOARD */}

        <Route
          path="/"
          element={

            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>

          }
        />


        {/* PROJECTS */}

        <Route
          path="/projects"
          element={

            <ProtectedRoute>

              <Projects />

            </ProtectedRoute>

          }
        />


        {/* PROJECT DETAIL */}

        <Route
          path="/projects/:id"
          element={

            <ProtectedRoute>

              <ProjectDetail />

            </ProtectedRoute>

          }
        />


        {/* UNKNOWN PAGE */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />


      </Routes>

    </BrowserRouter>

  );
}

export default App;