import React, { SyntheticEvent } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

interface ScoopOptionsProps {
  name: string;
  imagePath: string;
  updateItemCount: any;
}

export function ScoopOptions({ name, imagePath, updateItemCount }: ScoopOptionsProps): JSX.Element {
  const handleChange = (event: SyntheticEvent) => {
    updateItemCount(name, (event.target as HTMLInputElement).value);
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group controlId={`${name}-count`} as={Row} style={{ marginTop: '10px' }}>
        <Form.Label column xs={6} style={{ textAlign: 'right' }}>
          {name}
        </Form.Label>
        <Col xs={5} style={{ textAlign: 'left' }}>
          <Form.Control type="number" defaultValue={0} onChange={handleChange} />
        </Col>
      </Form.Group>
    </Col>
  );
}
