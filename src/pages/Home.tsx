import React from 'react';
import { Hero } from '../components/Hero/Hero';
import { ApplicationCenter } from '../components/ApplicationCenter/ApplicationCenter';

interface HomeProps {
  onNavigate: (route: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <main id="home-main-view" className="flex flex-col w-full">
      {/* 1. Hero Region */}
      <Hero onNavigate={onNavigate} />

      {/* 2. Application Center Region (7 Micro-Apps Grid) */}
      <ApplicationCenter onNavigate={onNavigate} />
    </main>
  );
};
