import React from 'react';
import { Alert } from 'react-bootstrap';

export function AlertBanner({
  message,
  variant,
}: {
  message?: string;
  variant?: string;
}): JSX.Element {
  return (
    <Alert variant={variant} style={{ backgroundColor: 'red' }}>
      {message}
    </Alert>
  );
}

AlertBanner.defaultProps = {
  message: 'An unexpected error occured. Please try again later!',
  variant: 'danger',
};
