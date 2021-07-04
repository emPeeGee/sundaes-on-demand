import React from 'react';

import userEvent from '@testing-library/user-event';
import { render, screen } from '../../../utils/testing-library-utils';

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

test('Update scoop subtotal when scoops changes', async () => {
  render(<Options optionType="scoops" />);

  // Make sure subtotal start with $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  // Update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole('spinbutton', { name: /vanilla/i });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');

  // Update chocolage scoops to 2 and check the subtotal
  const chocolateInput = await screen.findByRole('spinbutton', { name: /chocolate/i });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');
  expect(scoopsSubtotal).toHaveTextContent('6.00');
});
