import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';

const AppContent = () => {
  const [bgClass, setBgClass] = useState('bg-default');

  return (
    <div className={`app-wrapper ${bgClass}`}>
      <Routes>
        <Route path="/" element={<Home onBackgroundChange={setBgClass} />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
};

export default App;
