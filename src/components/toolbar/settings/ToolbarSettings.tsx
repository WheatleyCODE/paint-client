import React, { FC, MutableRefObject } from 'react';
import { Form } from 'react-bootstrap';
import { ShapeFillTypes } from '../../../types';
import { fillRadios } from '../../../consts';
import { FillToggle } from './FillToggle';

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

export const ToolbarSettings: FC<IToolbarSettingsProps> = (props) => {
  const { fill, lineWidth, lightness, saturation, effectSpeed, min = 1, max = 100 } = props;

  return (
    <div className="toolbar-settings">
      <div className="toolbar-settings__title">Fill:</div>
      <div className="toolbar-settings__fill" ref={fill.ref}>
        {fillRadios.map(({ value, Icon }) => (
          <FillToggle
            key={value}
            value={value}
            Icon={Icon}
            isChecked={value === fill.value}
            changeValue={fill.changeValue}
          />
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
