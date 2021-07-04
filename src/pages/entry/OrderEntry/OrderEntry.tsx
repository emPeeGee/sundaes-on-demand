import React from 'react';

import { Options } from '../Options/Options';

export function OrderEntry(): JSX.Element {
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
    </div>
  );
}
