import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { SummaryForm } from './pages/summary/SummaryForm/SummaryForm';
import { OrderSummary } from './pages/summary/OrderSummary/OrderSummary';

function App(): JSX.Element {
  return (
    <div className="App">
      <OrderSummary />
      <SummaryForm />
    </div>
  );
}

export default App;
