import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import { UserSelect } from './UserSelect';

describe('Область выделения', () => {
  test('Выделение подключенного пользователя', () => {
    const { getByText, getByTestId } = render(
      <Provider store={{ ...store }}>
        <UserSelect name="Дмитрий" />
      </Provider>
    );

    const select = getByTestId('select');
    const name = getByText('Дмитрий');

    expect(name).toBeInTheDocument();
    expect(select.className).toBe('select-connection');
  });

  test('Выделение пользователя', () => {
    const { getByTestId, queryByTestId } = render(
      <Provider store={{ ...store }}>
        <UserSelect />
      </Provider>
    );

    const select = getByTestId('select');
    const userConnect = queryByTestId('user-connect');

    expect(select.className).toBe('select');
    expect(userConnect).toBeNull();
  });
});
