import React from 'react';
import { Container } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { OrderSummary } from './pages/summary/OrderSummary/OrderSummary';
import { OrderEntry } from './pages/entry/OrderEntry/OrderEntry';
import { OrderDetailsProvider } from './context/OrderDetails';

function App(): JSX.Element {
  return (
    <div className="App">
      <Container>
        <OrderDetailsProvider>
          <OrderEntry />
        </OrderDetailsProvider>
      </Container>
    </div>
  );
}

export default App;
