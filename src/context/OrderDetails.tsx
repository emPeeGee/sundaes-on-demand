import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { pricePerItem } from '../constants';

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

const OrderDetails = createContext<any>(null);

export function useOrderDetails() {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error('useOrderDetails must be used in OrderDetailsProvider');
  }

  return context;
}

function calculateSubtotal(optionType: 'scoops' | 'toppings', optionCounts: any): number {
  let optionCount = 0;

  // eslint-disable-next-line no-restricted-syntax
  for (const count of optionCounts[optionType].values()) {
    optionCount += count;
  }

  return optionCount * pricePerItem[optionType];
}

export function OrderDetailsProvider({ children }: { children: React.ReactNode }) {
  const [optionCounts, setOptionsCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });

  const zeroCurrency = formatCurrency(0);

  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal('scoops', optionCounts);
    const toppingsSubtotal = calculateSubtotal('toppings', optionCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;

    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    function updateItemCount(
      itemName: string,
      newItemCount: string,
      optionType: 'scoops' | 'toppings'
    ) {
      const newOptionCounts = { ...optionCounts };
      const optionCountsMap = optionCounts[optionType];

      optionCountsMap.set(itemName, Number(newItemCount));

      setOptionsCounts(newOptionCounts);
    }

    return [{ ...optionCounts }, updateItemCount];
  }, [optionCounts]);

  return <OrderDetails.Provider value={value}>{children}</OrderDetails.Provider>;
}
