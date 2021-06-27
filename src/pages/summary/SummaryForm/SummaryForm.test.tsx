import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SummaryForm } from './SummaryForm';

describe('Test OrderSummary', () => {
  test('Checkbox is unchecked by default', () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i });
    const confirmButton = screen.getByRole('button', { name: /confirm order/i });

    expect(checkbox).not.toBeChecked();
    expect(confirmButton).toBeDisabled();
  });

  test('Clicking checkbox enables button on vice versa', () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i });
    const confirmButton = screen.getByRole('button', { name: /confirm order/i });

    userEvent.click(checkbox);
    expect(confirmButton).toBeEnabled();

    userEvent.click(checkbox);
    expect(confirmButton).toBeDisabled();
  });

  test('Popover respond to hover', async () => {
    render(<SummaryForm />);

    // popover start out hidden
    const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
    expect(nullPopover).not.toBeInTheDocument();

    // popover appears upon mouseover of checkbox label
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    userEvent.hover(termsAndConditions);

    const popover = screen.getByText(/no ice cream will actually be delivered/i);
    expect(popover).toBeInTheDocument();

    // popover dissapears when w e mouse out
    userEvent.unhover(termsAndConditions);

    await waitForElementToBeRemoved(() =>
      screen.queryByText(/no ice cream will actually be delivered/i)
    );
    // expect(disapearedPopover).not.toBeInTheDocument();
  });
});
