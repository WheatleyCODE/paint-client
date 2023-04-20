import { render } from '@testing-library/react';
import { MdClose } from 'react-icons/md';
import { FillToggle } from './FillToggle';
import { ShapeFillTypes } from '../../../../types';

describe('Чекбокс', () => {
  test('Наличие label', () => {
    const { getByTestId } = render(
      <FillToggle value={ShapeFillTypes.FILL} Icon={MdClose} isChecked changeValue={() => {}} />
    );

    const label = getByTestId('toggle-button');
    expect(label).toBeInTheDocument();
  });
});
