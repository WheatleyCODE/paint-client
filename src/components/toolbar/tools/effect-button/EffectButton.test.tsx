import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MdClose } from 'react-icons/md';
import { store } from '../../../../store/store';
import { EffectButton } from './EffectButton';
import { EffectTypes } from '../../../../types';

describe('Кнопка эффекта', () => {
  test('Активный', () => {
    const { getByTestId } = render(
      <Provider store={{ ...store }}>
        <EffectButton effectType={EffectTypes.RAINBOW} isActive Icon={MdClose} />
      </Provider>
    );

    const icon = getByTestId('icon');
    const button = getByTestId('button');

    expect(icon).toBeInTheDocument();
    expect(button.className.indexOf('active')).toBeGreaterThan(0);
  });

  test('Не активный', () => {
    const { getByTestId } = render(
      <Provider store={{ ...store }}>
        <EffectButton effectType={EffectTypes.RAINBOW} isActive={false} Icon={MdClose} />
      </Provider>
    );

    const icon = getByTestId('icon');
    const button = getByTestId('button');

    expect(icon).toBeInTheDocument();
    expect(button.className.indexOf('active')).toBe(-1);
  });

  test('Клик', () => {
    const { getByTestId } = render(
      <Provider store={{ ...store }}>
        <EffectButton effectType={EffectTypes.RAINBOW} isActive={false} Icon={MdClose} />
      </Provider>
    );

    const button = getByTestId('button');
    expect(button).toBeEnabled();
    fireEvent.click(button);
  });
});
