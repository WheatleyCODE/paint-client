import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { UserModal } from './UserModal';
import { store as reduxStore } from '../../store/store';

describe('Модальное окно, для записи ника пользователя', () => {
  let store = { ...reduxStore };

  beforeAll(() => {
    store = { ...reduxStore };
  });

  test('Заголовки', () => {
    const { getByText } = render(
      <Provider store={store}>
        <UserModal />
      </Provider>
    );

    const inputTitle = getByText('@');
    const titleElement = getByText(/welcome to paint online/i);

    expect(titleElement).toBeInTheDocument();
    expect(inputTitle).toBeInTheDocument();
  });

  test('Ввод никнейма - корректное', () => {
    const { getByText, getByPlaceholderText, getByRole, queryByTitle } = render(
      <Provider store={store}>
        <UserModal />
      </Provider>
    );

    const button = getByText('Draw');
    const input = getByPlaceholderText('Username');

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(getByRole('dialog').className).toBe('fade modal show');

    fireEvent.input(input, {
      target: { value: 'Username' },
    });

    expect(getByPlaceholderText('Username')).toContainHTML('Username');
    expect(queryByTitle('alert')).toBeNull();

    fireEvent.click(button);

    expect(getByRole('dialog').className).toBe('fade modal');
  });

  test('Ввод никнейма - некорректное', async () => {
    const { getByText, getByPlaceholderText, getByRole, getByTitle } = render(
      <Provider store={store}>
        <UserModal />
      </Provider>
    );

    const button = getByText('Draw');
    const input = getByPlaceholderText('Username');

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(getByRole('dialog').className).toBe('fade modal show');

    fireEvent.input(input, {
      target: { value: 'Us' },
    });

    expect(getByPlaceholderText('Username')).toContainHTML('Us');
    expect(getByTitle('alert'));
    expect(button).toBeDisabled();

    fireEvent.click(button);

    expect(getByRole('dialog').className).toBe('fade modal show');
  });

  test('Ввод никнейма - некорректное', async () => {
    const { getByText, getByPlaceholderText, getByRole, getByTitle } = render(
      <Provider store={store}>
        <UserModal />
      </Provider>
    );

    const button = getByText('Draw');
    const input = getByPlaceholderText('Username');

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(getByRole('dialog').className).toBe('fade modal show');

    fireEvent.input(input, {
      target: { value: 'UserUserUserUser1' },
    });

    expect(getByPlaceholderText('Username')).toContainHTML('UserUserUserUser1');
    expect(getByTitle('alert'));
    expect(button).toBeDisabled();

    fireEvent.click(button);

    expect(getByRole('dialog').className).toBe('fade modal show');
  });
});
