import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CryptoChart from './components/CryptoChart';
import WhaleAlerts from './components/WhaleAlerts';
import PortfolioTracker from './components/PortfolioTracker';
import DarkPool from './components/DarkPool';
import ArbitrageRadar from './components/ArbitrageRadar/ArbitrageRadar';
import Footer from './components/Footer';

import ProUpgrade from './pages/ProUpgrade';

const Home = () => (
  <>
    <Navbar />
    <Hero />
    <div className="p-4 space-y-6">

      {/* 📈 Chart Section */}
      <div id="crypto" className="bg-surface border border-[#00f0ff33] p-4 rounded-xl shadow-lg">
        <CryptoChart />
      </div>

      {/* 🐋 Whale Alerts */}
      <div id="whales" className="bg-surface border border-[#00f0ff33] p-4 rounded-xl shadow-lg">
        <WhaleAlerts />
      </div>

      {/* 💼 Portfolio Tracker */}
      <div id="portfolio" className="bg-surface border border-[#00f0ff33] p-4 rounded-2xl shadow-xl">
        <PortfolioTracker />
      </div>

      {/* 🕳️ Dark Pool Terminal */}
      <div id="darkpool" className="bg-gradient-to-tr from-black via-[#0c0c0f] to-black border border-[#00f0ff33] p-6 rounded-2xl shadow-xl backdrop-blur-sm">
        <DarkPool />
      </div>

      {/* 📡 Arbitrage Radar */}
      <div id="arbitrage" className="bg-gradient-to-tr from-black via-zinc-900 to-black border border-[#00f0ff33] p-6 rounded-2xl shadow-xl backdrop-blur">
        <ArbitrageRadar />
      </div>

    </div>

    {/* 📞 Footer / Contact */}
    <div id="contact">
      <Footer />
    </div>
  </>
);

const App = () => {
  return (
    <Router>
      <div className="bg-background text-white min-h-screen font-sora">
        <Routes>
          {/* 🚀 Load ProUpgrade as default */}
          <Route path="/" element={<Navigate to="/pro-upgrade" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/pro-upgrade" element={<ProUpgrade />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
