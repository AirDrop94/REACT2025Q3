import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearItems } from '../../store/selectedItemsSlice';
import './SelectedFlyout.css';

const SelectedFlyout: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector((state) => state.selectedItems.items);

  const handleClear = () => {
    dispatch(clearItems());
  };

  const handleDownload = () => {
    const csvRows = [
      ['Name', 'URL'],
      ...selectedItems.map((item) => [item.name, item.url]),
    ];

    const csvContent = csvRows.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedItems.length}_items.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (selectedItems.length === 0) return null;

  return (
    <div className="flyout">
      <span>{selectedItems.length} item(s) selected</span>
      <div className="flyout__buttons">
        <button onClick={handleClear}>Unselect all</button>
        <button onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
};

export default SelectedFlyout;
