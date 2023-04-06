import React, { FC, MutableRefObject } from 'react';
import { Form, ToggleButton } from 'react-bootstrap';
import { MdOutlineSquare, MdSquare } from 'react-icons/md';
import { ShapeFillTypes, ToolTypes } from '../../types';
import { useTypedSelector } from '../../hooks';

export interface IToolbarSettingsProps {
  fill: {
    value: ShapeFillTypes;
    ref: MutableRefObject<HTMLInputElement | null>;
    changeValue: (val: ShapeFillTypes) => void;
  };

  lineWidth: {
    value: number;
    ref: MutableRefObject<HTMLInputElement | null>;
  };

  lightness: {
    value: number;
    ref: MutableRefObject<HTMLInputElement | null>;
    changeValue: (val: number) => void;
  };

  saturation: {
    value: number;
    ref: MutableRefObject<HTMLInputElement | null>;
    changeValue: (val: number) => void;
  };

  effectSpeed: {
    value: number;
    ref: MutableRefObject<HTMLInputElement | null>;
    changeValue: (val: number) => void;
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
  const { fill, lineWidth, lightness, saturation, effectSpeed, min = 1, max = 100 } = props;

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
      <div className="toolbar-settings__title">Lightness: ({lightness.value})</div>
      <Form.Range ref={lightness.ref} value={lightness.value} min={min} max={max} />

      <div className="toolbar-settings__title">Saturation: ({saturation.value})</div>
      <Form.Range ref={saturation.ref} value={saturation.value} min={min} max={max} />

      <div className="toolbar-settings__title-bold">Effect Speed:</div>
      <div className="toolbar-settings__title">Speed: ({effectSpeed.value})</div>
      <Form.Range ref={effectSpeed.ref} value={effectSpeed.value} min={1} max={10} />
    </div>
  );
};
