import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Signup } from "./pages/signup";
import { Signin } from "./pages/signin";
import { Dashboard } from "./pages/Dashboard";
import { Spaces } from "./pages/Spaces";
import { userSpaces } from "./hooks/Hooks";

function App() {
  const { spaces } = userSpaces();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/space/:space_id" element={<Spaces />} />
        <Route />
        <Route />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
