import type { PokemonItem } from '../types';

export const downloadCSV = (items: PokemonItem[]): void => {
  const csvRows = [
    ['Name', 'URL'],
    ...items.map((item) => [item.name, item.url]),
  ];

  const csvContent = csvRows.map((row) => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${items.length}_items.csv`;
  a.click();
  URL.revokeObjectURL(url);
};
