import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Scan } from './pages/Scan';
import { Results } from './pages/Results';
import { BountyBoard } from './pages/BountyBoard';
import { HunterNotes } from './pages/HunterNotes';
import { Subscribe } from './pages/Subscribe';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="scan" element={<Scan />} />
          <Route path="results" element={<Results />} />
          <Route path="bounty-board" element={<BountyBoard />} />
          <Route path="hunter-notes" element={<HunterNotes />} />
          <Route path="subscribe" element={<Subscribe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;