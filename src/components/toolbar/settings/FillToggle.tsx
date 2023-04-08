import React, { FC } from 'react';
import { ToggleButton } from 'react-bootstrap';
import { IconType } from 'react-icons';
import { ShapeFillTypes } from '../../../types';

export interface IFillToggleProps {
  value: ShapeFillTypes;
  Icon: IconType;
  isChecked: boolean;
  changeValue: (shapeFillType: ShapeFillTypes) => void;
}

export const FillToggle: FC<IFillToggleProps> = ({ value, Icon, isChecked, changeValue }) => {
  const onChangeHandler = () => {
    changeValue(value);
  };

  return (
    <ToggleButton
      id={`radio-${value}`}
      type="radio"
      name="radio"
      className="btn icon btn-cian"
      value={value}
      checked={isChecked}
      onChange={onChangeHandler}
    >
      <Icon />
    </ToggleButton>
  );
};
