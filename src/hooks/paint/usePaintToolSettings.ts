import { MutableRefObject, useRef } from 'react';
import { IValidInputOpts, useValidInput } from '../useValidInput';
import { useTypedSelector } from '../redux';
import { ShapeFillTypes } from '../../types';

export interface IPainToolSettings {
  majorColor: {
    input: IValidInputOpts<string>;
    ref: MutableRefObject<HTMLInputElement | null>;
  };

  minorColor: {
    input: IValidInputOpts<string>;
    ref: MutableRefObject<HTMLInputElement | null>;
  };

  lineWidth: {
    input: IValidInputOpts<number>;
    ref: MutableRefObject<HTMLInputElement | null>;
  };

  fill: {
    input: IValidInputOpts<ShapeFillTypes>;
    ref: MutableRefObject<HTMLInputElement | null>;
  };

  lightness: {
    input: IValidInputOpts<number>;
    ref: MutableRefObject<HTMLInputElement | null>;
  };

  saturation: {
    input: IValidInputOpts<number>;
    ref: MutableRefObject<HTMLInputElement | null>;
  };

  effectSpeed: {
    input: IValidInputOpts<number>;
    ref: MutableRefObject<HTMLInputElement | null>;
  };
}

export const usePaintToolSettings = (): IPainToolSettings => {
  const { toolSettings } = useTypedSelector((state) => state.paint);

  const majorColorInput = useValidInput(toolSettings.majorColor);
  const minorColorInput = useValidInput(toolSettings.minorColor);
  const lineWidthInput = useValidInput(toolSettings.lineWidth);
  const fillInput = useValidInput(toolSettings.currentShapeFillType);
  const lightnessInput = useValidInput(toolSettings.lightness);
  const saturationInput = useValidInput(toolSettings.saturation);
  const effectSpeedInput = useValidInput(toolSettings.effectSpeed);

  const majorColorRef = useRef<HTMLInputElement | null>(null);
  const minorColorRef = useRef<HTMLInputElement | null>(null);
  const lineWidthRef = useRef<HTMLInputElement | null>(null);
  const fillRef = useRef<HTMLInputElement | null>(null);
  const lightnessRef = useRef<HTMLInputElement | null>(null);
  const saturationRef = useRef<HTMLInputElement | null>(null);
  const effectSpeedRef = useRef<HTMLInputElement | null>(null);

  return {
    majorColor: {
      input: majorColorInput,
      ref: majorColorRef,
    },

    minorColor: {
      input: minorColorInput,
      ref: minorColorRef,
    },

    lineWidth: {
      input: lineWidthInput,
      ref: lineWidthRef,
    },

    fill: {
      input: fillInput,
      ref: fillRef,
    },

    lightness: {
      input: lightnessInput,
      ref: lightnessRef,
    },

    saturation: {
      input: saturationInput,
      ref: saturationRef,
    },

    effectSpeed: {
      input: effectSpeedInput,
      ref: effectSpeedRef,
    },
  };
};
