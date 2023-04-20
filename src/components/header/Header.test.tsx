import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store as reduxStore } from '../../store/store';
import { Header } from './Header';
import { initialState } from '../../store/paint/paint.slice';
import { renderWithProviders } from '../../utils/tests/renderWithProviders';

describe('Шапка', () => {
  const store = { ...reduxStore };

  test('Заголовки', () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const title = getByText(/magic paint online/i);
    const undo = getByTestId('undo');
    const redo = getByTestId('redo');

    expect(title).toBeInTheDocument();
    expect(undo).toBeInTheDocument();
    expect(redo).toBeInTheDocument();
  });

  test('Подключения', () => {
    const { getByText } = renderWithProviders(<Header />, {
      preloadedState: {
        paint: {
          ...initialState,
          connections: ['Вася', 'Дима'],
        },
      },
    });

    const user1 = getByText(/вася/i);
    const user2 = getByText(/дима/i);

    expect(user1).toBeInTheDocument();
    expect(user2).toBeInTheDocument();
  });
});
