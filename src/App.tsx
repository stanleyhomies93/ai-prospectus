import React from 'react';
import { AppHeader } from './components/AppHeader';
import { ProspectusGenerator } from './components/ProspectusGenerator';
export function App() {
  return <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      <AppHeader />
      <main className="flex-1">
        <ProspectusGenerator />
      </main>
    </div>;
}