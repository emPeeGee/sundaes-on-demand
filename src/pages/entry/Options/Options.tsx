import React from 'react';
import axios from 'axios';

import { ScoopOptions } from '../ScoopOptions/ScoopOptions';

export function Options(optionType: string): JSX.Element {
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
  const ItemComponent = optionType === 'scoops' ? ScoopOptions : null;
  const optionItems = items.map((item) => {
    return <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} />;
  });

  return <div>{optionItems}</div>;
}
