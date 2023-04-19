import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { UserModal } from './UserModal';

describe('Модальное окно, для записи ника пользователя', () => {
  const initialState = {};
  const mockStore = configureStore();
  let store;

  test('Заголовки', () => {
    store = mockStore(initialState);

    render(
      <Provider store={store}>
        <UserModal />
      </Provider>
    );

    const inputTitle = screen.getByText('@');
    const titleElement = screen.getByText(/welcome to paint online/i);

    expect(titleElement).toBeInTheDocument();
    expect(inputTitle).toBeInTheDocument();
  });

  test('Ввод никнейма - корректное', () => {
    store = mockStore(initialState);

    render(
      <Provider store={store}>
        <UserModal />
      </Provider>
    );

    const button = screen.getByText('Draw');
    const input = screen.getByPlaceholderText('Username');

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(screen.getByRole('dialog').className).toBe('fade modal show');

    fireEvent.input(input, {
      target: { value: 'Username' },
    });

    expect(screen.getByPlaceholderText('Username')).toContainHTML('Username');
    expect(screen.queryByTitle('alert')).toBeNull();

    fireEvent.click(button);

    expect(screen.getByRole('dialog').className).toBe('fade modal');
  });

  test('Ввод никнейма - некорректное', async () => {
    store = mockStore(initialState);

    render(
      <Provider store={store}>
        <UserModal />
      </Provider>
    );

    const button = screen.getByText('Draw');
    const input = screen.getByPlaceholderText('Username');

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(screen.getByRole('dialog').className).toBe('fade modal show');

    fireEvent.input(input, {
      target: { value: 'Us' },
    });

    expect(screen.getByPlaceholderText('Username')).toContainHTML('Us');
    expect(screen.getByTitle('alert'));
    expect(button).toBeDisabled();

    fireEvent.click(button);

    expect(screen.getByRole('dialog').className).toBe('fade modal show');
  });

  test('Ввод никнейма - некорректное', async () => {
    store = mockStore(initialState);

    render(
      <Provider store={store}>
        <UserModal />
      </Provider>
    );

    const button = screen.getByText('Draw');
    const input = screen.getByPlaceholderText('Username');

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(screen.getByRole('dialog').className).toBe('fade modal show');

    fireEvent.input(input, {
      target: { value: 'UserUserUserUser1' },
    });

    expect(screen.getByPlaceholderText('Username')).toContainHTML('UserUserUserUser1');
    expect(screen.getByTitle('alert'));
    expect(button).toBeDisabled();

    fireEvent.click(button);

    expect(screen.getByRole('dialog').className).toBe('fade modal show');
  });
});
