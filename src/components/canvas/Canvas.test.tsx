import userEvent from '@testing-library/user-event';
import { Canvas } from './Canvas';
import { renderWithProviders } from '../../utils/tests/renderWithProviders';
import { initialState } from '../../store/paint/paint.slice';

describe('Холст', () => {
  test('Главные элементы', () => {
    const { getByTestId } = renderWithProviders(<Canvas lineWidthValue={10} />, {
      preloadedState: {
        paint: {
          ...initialState,
        },
      },
    });

    const canvas = getByTestId('canvas') as HTMLCanvasElement;
    const rightResize = getByTestId('right');
    const bottomResize = getByTestId('bottom');
    const shield = getByTestId('shield');

    expect(canvas).toBeInTheDocument();
    expect(rightResize).toBeInTheDocument();
    expect(bottomResize).toBeInTheDocument();
    expect(shield).toBeInTheDocument();

    expect(canvas.width).toBe(500);
    expect(canvas.height).toBe(500);
  });

  test('Области выделения', () => {
    const { getByText } = renderWithProviders(<Canvas lineWidthValue={10} />, {
      preloadedState: {
        paint: {
          ...initialState,
          connections: ['Василий', 'Дмитрий'],
        },
      },
    });

    const user1 = getByText(/василий/i);
    const user2 = getByText(/дмитрий/i);

    expect(user1).toBeInTheDocument();
    expect(user2).toBeInTheDocument();
  });

  test('Изменение размера', () => {
    const { getByTestId } = renderWithProviders(<Canvas lineWidthValue={10} />, {
      preloadedState: {
        paint: {
          ...initialState,
        },
      },
    });

    const canvas = getByTestId('canvas') as HTMLCanvasElement;
    const rightResize = getByTestId('right');
    const bottomResize = getByTestId('bottom');

    expect(rightResize).toBeInTheDocument();
    expect(bottomResize).toBeInTheDocument();

    expect(canvas.width).toBe(500);
    expect(canvas.height).toBe(500);

    userEvent.click(rightResize);
  });
});
