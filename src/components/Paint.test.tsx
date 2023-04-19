import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Paint } from './Paint';
import { initialState } from '../store/paint/paint.slice';

describe('Основной компонент', () => {
  const initState = initialState;
  const mockStore = configureStore();
  let store;

  test('Рендер с дефолтным сейтом', () => {
    store = mockStore({ paint: initState });

    // render(
    //   <Provider store={store}>
    //     <Paint />
    //   </Provider>
    // );
  });
});
