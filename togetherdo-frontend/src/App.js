import React from 'react';

import { MainArea } from './components/layout/Main-Area';

import { Navbar } from './components/layout/Navbar';

export const App = () => {
  return (
    <div className="App">
        <Navbar />
        <MainArea />
    </div>
  );
}
