import { render } from '@testing-library/react';
import { MdClose } from 'react-icons/md';
import { ToolButton } from './ToolButton';

describe('Кнопка инструмента', () => {
  test('Не активна', () => {
    const { getByTestId } = render(
      <ToolButton isActive={false} Icon={MdClose} onClick={() => {}} />
    );

    const button = getByTestId('tool-button');
    expect(button.className.indexOf('active')).toBe(-1);
  });

  test('Активна', () => {
    const { getByTestId } = render(<ToolButton isActive Icon={MdClose} onClick={() => {}} />);

    const button = getByTestId('tool-button');
    expect(button.className.indexOf('active')).toBeGreaterThan(0);
  });
});
