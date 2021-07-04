import React from 'react';
import axios from 'axios';
import { Row } from 'react-bootstrap';

import { ScoopOptions } from '../ScoopOptions/ScoopOptions';
import { ToppingOptions } from '../ToppingOptions/ToppingOptions';
import { AlertBanner } from '../../common/AlertBanner/AlertBanner';
import { pricePerItem } from '../../../constants';
import { useOrderDetails } from '../../../context/OrderDetails';

interface OptionsProps {
  optionType: 'scoops' | 'toppings';
}

export function Options({ optionType }: OptionsProps): JSX.Element {
  const [items, setItems] = React.useState<any[]>([]);
  const [error, setError] = React.useState<boolean>(false);

  const [orderDetails, updateItemCount] = useOrderDetails();

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

  const title = `${optionType[0].toUpperCase()}${optionType.slice(1).toLowerCase()}`;

  return (
    <>
      <h2>{title}</h2>
      <p>{pricePerItem[optionType]} each</p>
      <p>
        {title} total: {orderDetails.totals[optionType]}
      </p>
      <Row>
        {items.map((item) => {
          if (optionType === 'scoops') {
            return (
              <ScoopOptions
                key={item.name}
                name={item.name}
                imagePath={item.imagePath}
                updateItemCount={(itemName: string, newItemCount: number) =>
                  updateItemCount(itemName, newItemCount, optionType)
                }
              />
            );
          }

          return (
            <ToppingOptions
              key={item.name}
              name={item.name}
              imagePath={item.imagePath}
              updateItemCount={(itemName: string, newItemCount: number) =>
                updateItemCount(itemName, newItemCount, optionType)
              }
            />
          );
        })}
      </Row>
    </>
  );
}
