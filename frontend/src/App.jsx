import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Spaces } from "./pages/Spaces";
import { Testimonial } from "./pages/Testimonial";
import { Home } from "./pages/Home";
import { SpecificTestimonial } from "./pages/SpecificTestimonial";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/:slug" element={<Testimonial />} />
        <Route path="/space/:space_id" element={<Spaces />} />
        <Route path="/testimonial/:id" element={<SpecificTestimonial />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
