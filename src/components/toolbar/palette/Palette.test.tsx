import { render } from '@testing-library/react';
import React from 'react';
import Palette from './Palette';

describe('Предпросмотр кисти', () => {
  test('Главный элемент, дефолтное состояние', () => {
    const { getByTestId } = render(<Palette input={{ value: 'RANDOM VALUE', ref: null as any }} />);
    const input = getByTestId('palette') as HTMLInputElement;

    expect(input).toBeInTheDocument();
    expect(input.value).toBe('#000000');
  });

  test('Изменение значения', () => {
    const { getByTestId } = render(<Palette input={{ value: '#fafafa', ref: null as any }} />);
    const input = getByTestId('palette') as HTMLInputElement;

    expect(input.value).toBe('#fafafa');
  });

  test('Изменение значения некорректное', () => {
    const { getByTestId } = render(
      <Palette input={{ value: 'rgb(166,97,213)', ref: null as any }} />
    );
    const input = getByTestId('palette') as HTMLInputElement;

    expect(input.value).toBe('#000000');
  });
});
