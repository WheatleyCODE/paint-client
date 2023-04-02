import React, { FC, MutableRefObject } from 'react';
import { Form } from 'react-bootstrap';

export interface IToolbarSettingsProps {
  fill: {
    ref: MutableRefObject<HTMLInputElement | null>;
    value: boolean;
  };

  lineWidth: {
    ref: MutableRefObject<HTMLInputElement | null>;
    value: number;
  };

  borderWidth: {
    ref: MutableRefObject<HTMLInputElement | null>;
    value: number;
  };

  min?: number;
  max?: number;
}

export const ToolbarSettings: FC<IToolbarSettingsProps> = (props) => {
  const { fill, lineWidth, borderWidth, min = 1, max = 100 } = props;
  return (
    <div className="toolbar-settings">
      <div className="toolbar-settings__title">Fill</div>
      <Form.Check checked={fill.value} ref={fill.ref} className="checkbox" />

      <div className="toolbar-settings__title">Line: ({lineWidth.value})</div>
      <Form.Range value={lineWidth.value} ref={lineWidth.ref} min={min} max={max} />

      <div className="toolbar-settings__title">Border: ({borderWidth.value})</div>
      <Form.Range value={borderWidth.value} ref={borderWidth.ref} min={min} max={max} />

      <div className="toolbar-settings__title-bold">Magic Brush:</div>
      <div className="toolbar-settings__title">Lightness: ({lineWidth.value})</div>
      <Form.Range value={lineWidth.value} min={min} max={max} />

      <div className="toolbar-settings__title">Saturation: ({lineWidth.value})</div>
      <Form.Range value={lineWidth.value} min={min} max={max} />
    </div>
  );
};
