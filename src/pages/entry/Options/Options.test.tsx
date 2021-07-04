import React from 'react';

import { render, screen } from '@testing-library/react';
import { Options } from './Options';

test('displays image for each scoop options from server', async () => {
  render(<Options optionType="scoops" />);

  // find images
  const scoopImages = (await screen.findAllByRole('img', {
    name: /scoop$/i,
  })) as HTMLImageElement[];
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('display images for each topping options from server', async () => {
  render(<Options optionType="toppings" />);

  const toppingImages = (await screen.findAllByRole('img', {
    name: /topping$/i,
  })) as HTMLImageElement[];
  expect(toppingImages).toHaveLength(3);

  const altTexts = toppingImages.map((element) => element.alt);
  expect(altTexts).toEqual(['Cherries topping', 'M&M topping', 'Hot fudge topping']);
});
