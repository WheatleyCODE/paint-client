import { render } from '@testing-library/react';
import { BrushPreview } from './BrushPreview';

describe('Предпросмотр кисти', () => {
  test('Главный элемент', () => {
    const { getByTestId } = render(<BrushPreview width={10} color="#fafafa" />);
    const brush = getByTestId('brash-preview');
    expect(brush).toBeInTheDocument();
  });

  test('Изменение параметров', () => {
    const { getByTestId, debug } = render(<BrushPreview width={10} color="red" />);
    const brush = getByTestId('brash-preview');
    debug();
    expect(brush).toHaveStyle('width: 10px; height: 10px; background: red;');
  });

  test('Изменение параметров', () => {
    const { getByTestId, debug } = render(<BrushPreview width={100} color="#fafafa" />);
    const brush = getByTestId('brash-preview');
    debug();
    expect(brush).toHaveStyle('width: 100px; height: 100px; background: #fafafa;');
  });
});
