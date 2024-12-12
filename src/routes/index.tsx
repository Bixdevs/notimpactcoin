import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Games } from '../pages/Games';
import { SpinWheel } from '../pages/games/SpinWheel';
import { CoinFlip } from '../pages/games/CoinFlip';
import { Farm } from '../pages/games/Farm';
import { Clicker } from '../pages/games/Clicker';
import { Referral } from '../pages/Referral';
import { Store } from '../pages/Store';
import { Wallet } from '../pages/Wallet';
import { Profile } from '../pages/Profile';
import { AdminPanel } from '../pages/admin/AdminPanel';
import { Tasks } from '../pages/Tasks';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/games" element={<Games />} />
      <Route path="/games/spin-wheel" element={<SpinWheel />} />
      <Route path="/games/coin-flip" element={<CoinFlip />} />
      <Route path="/games/farm" element={<Farm />} />
      <Route path="/games/clicker" element={<Clicker />} />
      <Route path="/referral" element={<Referral />} />
      <Route path="/store" element={<Store />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/tasks" element={<Tasks />} />
    </Routes>
  );
}