import React from 'react';
import Home from "./components/Home";
import Card from './components/Card'; 
import Navbar from "./components/Navbar";
import DeckComponent from "./components/DeckComponent"; 
import About from "./components/About"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/card" element={<Card />} />
          <Route path="/decks" element={<DeckComponent />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/cards/:cardId"
            // element={({ params }) => {
            //   const cardId = parseInt(params.cardId, 10);
            //   return <Used cardId={cardId} />;
            // }}
          />
        </Routes>
      </Router>
    </>
  );  
};

export default App;
