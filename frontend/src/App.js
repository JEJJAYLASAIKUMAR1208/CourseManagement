import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Courses from "./components/Courses";
import Logout from "./components/Logout";
import "./App.css";

function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));

  return (
    <Router>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />

      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          <Route
            path="/login"
            element={
              isAuth ? (
                <Navigate to="/courses" />
              ) : (
                <Login setIsAuth={setIsAuth} />
              )
            }
          />

          <Route
            path="/register"
            element={isAuth ? <Navigate to="/courses" /> : <Register />}
          />

          <Route
            path="/courses"
            element={
              isAuth ? <Courses /> : <Navigate to="/login" />
            }
          />

          <Route
            path="/logout"
            element={<Logout setIsAuth={setIsAuth} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
