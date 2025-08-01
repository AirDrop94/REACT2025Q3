import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearItems } from '../../store/selectedItemsSlice';
import { downloadCSV } from '../../utils/downloadCSV';
import './SelectedFlyout.css';

const SelectedFlyout: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector((state) => state.selectedItems.items);

  const handleClear = () => {
    dispatch(clearItems());
  };

  const handleDownload = () => {
    downloadCSV(selectedItems);
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
