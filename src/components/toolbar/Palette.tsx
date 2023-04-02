import React, { MutableRefObject, FC } from 'react';

export interface IPaletteProps {
  input: {
    value: string;
    ref: MutableRefObject<HTMLInputElement | null>;
  };
}

const Palette: FC<IPaletteProps> = ({ input }) => {
  const { value, ref } = input;

  return <input value={value} ref={ref} type="color" className="input color" />;
};

export default Palette;
