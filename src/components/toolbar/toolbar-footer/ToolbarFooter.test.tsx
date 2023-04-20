import React from 'react';
import { renderWithProviders } from '../../../utils/tests/renderWithProviders';
import { ToolbarFooter } from './ToolbarFooter';

describe('Подвал панели инструментов', () => {
  test('Главный элементы', () => {
    const { getByText } = renderWithProviders(<ToolbarFooter />);

    const saveButton = getByText(/save image/i);
    const clearButton = getByText(/clear canvas/i);

    expect(saveButton).toBeInTheDocument();
    expect(clearButton).toBeInTheDocument();

    expect(saveButton).toBeEnabled();
    expect(clearButton).toBeEnabled();
  });
});
