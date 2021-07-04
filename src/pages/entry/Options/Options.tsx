import React from 'react';
import axios from 'axios';
import { Row } from 'react-bootstrap';

import { ScoopOptions } from '../ScoopOptions/ScoopOptions';

interface OptionsProps {
  optionType: string;
}

export function Options({ optionType }: OptionsProps): JSX.Element {
  const [items, setItems] = React.useState<any[]>([]);

  React.useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        // FIXME:
      });
  }, [optionType]);

  // FIXME:

  return (
    <Row>
      {items.map((item) => {
        if (optionType === 'scoops') {
          return <ScoopOptions key={item.name} name={item.name} imagePath={item.imagePath} />;
        }

        return null;
      })}
    </Row>
  );
}
