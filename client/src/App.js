import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./pages/Home";
// import Loader from "./components/Loader";
import { useState } from "react";

const App = () => {
  const [showLoader, setShowLoader] = useState(false);
  return (
    <Router>
      {/* {showLoader && <Loader />} */}
      <Routes>
        <Route path="/" element={<Header />}></Route>
        <Route path="/about" element={<div>About</div>}></Route>
        <Route path="/projects" element={<div>Projects</div>}></Route>
        <Route path="/contact" element={<div>Contact</div>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
