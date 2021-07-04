import React from 'react';
import { Col } from 'react-bootstrap';

interface ToppingOptionsProps {
  name: string;
  imagePath: string;
}

export function ToppingOptions({ name, imagePath }: ToppingOptionsProps): JSX.Element {
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />
    </Col>
  );
}