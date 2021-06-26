import React from 'react';

import { MainArea } from './components/layout/Main-Area';
import { Header } from './components/layout/header';

export const App = () => {
  return (
    <div className="App">
        <Header />
        <MainArea />
    </div>
  );
}
