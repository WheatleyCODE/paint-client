import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Paint } from './Paint';
import { store } from '../../store/store';

describe('Основной компонент', () => {
  test('Рендер с дефолтным сейтом', () => {
    const { getByTestId } = render(
      <Provider store={{ ...store }}>
        <Paint />
      </Provider>
    );

    const main = getByTestId('paint');
    expect(main).toBeInTheDocument();
  });
});
