import React from 'react';
import axios from 'axios';
import { Row } from 'react-bootstrap';

import { ScoopOptions } from '../ScoopOptions/ScoopOptions';
import { ToppingOptions } from '../ToppingOptions/ToppingOptions';
import { AlertBanner } from '../../common/AlertBanner/AlertBanner';

interface OptionsProps {
  optionType: string;
}

export function Options({ optionType }: OptionsProps): JSX.Element {
  const [items, setItems] = React.useState<any[]>([]);
  const [error, setError] = React.useState<boolean>(false);

  React.useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => {
        setItems(response.data);
      })
      .catch(() => {
        setError(true);
      });
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  return (
    <Row>
      {items.map((item) => {
        if (optionType === 'scoops') {
          return <ScoopOptions key={item.name} name={item.name} imagePath={item.imagePath} />;
        }

        return <ToppingOptions key={item.name} name={item.name} imagePath={item.imagePath} />;
      })}
    </Row>
  );
}
