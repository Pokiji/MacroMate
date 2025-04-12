import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import Landing from './landing.tsx';
import Home from './home.tsx'; // Import the Home component
import AddFood from './addFood.tsx';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <AddFood/>   */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addfood" element={<AddFood />} /> {/* Add this line */} 
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);