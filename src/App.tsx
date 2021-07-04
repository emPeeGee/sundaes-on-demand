import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { SummaryForm } from './pages/summary/SummaryForm/SummaryForm';

function App(): JSX.Element {
  return (
    <div className="App">
      <SummaryForm />
    </div>
  );
}

export default App;
