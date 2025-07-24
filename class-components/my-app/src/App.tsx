import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import MainPage from './pages/MainPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import PokemonDetail from './components/PokemonDetail';

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route path="" element={<MainPage />}>
        <Route index element={<div />} />
        <Route path="" element={<PokemonDetail />} />
      </Route>
      <Route path="about" element={<AboutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

export default App;
