import React, { MutableRefObject, FC } from 'react';

export interface IPaletteProps {
  input: {
    value: string;
    ref: MutableRefObject<HTMLInputElement | null>;
  };
}

const Palette: FC<IPaletteProps> = ({ input }) => {
  const { value, ref } = input;

  return (
    <input data-testid="palette" value={value} ref={ref} type="color" className="input color" />
  );
};

export default Palette;
