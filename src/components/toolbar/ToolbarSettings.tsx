import React, { FC, MutableRefObject } from 'react';
import { Form, ToggleButton } from 'react-bootstrap';
import { MdOutlineSquare, MdSquare } from 'react-icons/md';
import { ShapeFillTypes } from '../../types';

export interface IToolbarSettingsProps {
  fill: {
    ref: MutableRefObject<HTMLInputElement | null>;
    value: ShapeFillTypes;
    changeValue: (val: ShapeFillTypes) => void;
  };

  lineWidth: {
    ref: MutableRefObject<HTMLInputElement | null>;
    value: number;
  };

  min?: number;
  max?: number;
}

const radios = [
  { Icon: MdOutlineSquare, value: ShapeFillTypes.BORDER },
  { Icon: MdSquare, value: ShapeFillTypes.FILL },
  { Icon: MdOutlineSquare, value: ShapeFillTypes.FILL_BORDER },
];

export const ToolbarSettings: FC<IToolbarSettingsProps> = (props) => {
  const { fill, lineWidth, min = 1, max = 100 } = props;
  return (
    <div className="toolbar-settings">
      <div className="toolbar-settings__title">Fill:</div>
      <div className="toolbar-settings__fill" ref={fill.ref}>
        {radios.map((radio) => (
          <ToggleButton
            key={radio.value}
            id={`radio-${radio.value}`}
            type="radio"
            name="radio"
            className="btn icon btn-cian"
            value={radio.value}
            checked={fill.value === radio.value}
            onChange={() => fill.changeValue(radio.value)}
          >
            <radio.Icon />
          </ToggleButton>
        ))}
      </div>

      <div className="toolbar-settings__title">Line: ({lineWidth.value})</div>
      <Form.Range value={lineWidth.value} ref={lineWidth.ref} min={min} max={max} />

      <div className="toolbar-settings__title-bold">Magic Brush:</div>
      <div className="toolbar-settings__title">Lightness: ({lineWidth.value})</div>
      <Form.Range value={lineWidth.value} min={min} max={max} />

      <div className="toolbar-settings__title">Saturation: ({lineWidth.value})</div>
      <Form.Range value={lineWidth.value} min={min} max={max} />
    </div>
  );
};
