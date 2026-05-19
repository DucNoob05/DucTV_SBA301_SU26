import React from 'react';
import NavBar from './components/NavBar';
import BannerCarousel from './components/BannerCarousel';
import Orchids from './components/Orchids';
import './index.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <BannerCarousel />
      <Orchids />
    </div>
  );
}

export default App;
