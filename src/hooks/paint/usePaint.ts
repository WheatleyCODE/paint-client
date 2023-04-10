import { MutableRefObject, useEffect } from 'react';
import { fromEvent } from 'rxjs';
import { paintActions as PA } from '../../store';
import { useTypedDispatch } from '../redux';
import { ITools, usePaintTools } from './usePaintTools';
import { ChangeTSFilds, ShapeFillTypes } from '../../types';
import { usePaintToolSettings } from './usePaintToolSettings';
import { usePaintObservables } from './usePaintObservables';

export interface ISettings {
  majorColor: {
    value: string;
    ref: MutableRefObject<HTMLInputElement | null>;
    changeValue: (value: string) => void;
  };

  minorColor: {
    value: string;
    ref: MutableRefObject<HTMLInputElement | null>;
    changeValue: (value: string) => void;
  };

  lineWidth: {
    value: number;
    ref: MutableRefObject<HTMLInputElement | null>;
    changeValue: (value: number) => void;
  };

  fill: {
    value: ShapeFillTypes;
    ref: MutableRefObject<HTMLInputElement | null>;
    changeValue: (value: ShapeFillTypes) => void;
  };

  lightness: {
    value: number;
    ref: MutableRefObject<HTMLInputElement | null>;
    changeValue: (value: number) => void;
  };

  saturation: {
    value: number;
    ref: MutableRefObject<HTMLInputElement | null>;
    changeValue: (value: number) => void;
  };

  effectSpeed: {
    value: number;
    ref: MutableRefObject<HTMLInputElement | null>;
    changeValue: (value: number) => void;
  };
}

export interface IPaint {
  tools: ITools;
  settings: ISettings;
}

const streamMouseUp$ = fromEvent(document, 'mouseup');

export const usePaint = (): IPaint => {
  const dispatch = useTypedDispatch();
  const paintToolSettings = usePaintToolSettings();
  const { majorColor, minorColor, lineWidth, fill, lightness, saturation, effectSpeed } =
    paintToolSettings;

  const { observables } = usePaintObservables(paintToolSettings);
  const tools = usePaintTools({ observables, changeLineWidth: lineWidth.input.changeValue });

  useEffect(() => {
    const params: ChangeTSFilds = {
      lineWidth: lineWidth.input.value,
      majorColor: majorColor.input.value,
      minorColor: minorColor.input.value,
      currentShapeFillType: fill.input.value,
    };

    const sub = streamMouseUp$.subscribe(() => {
      dispatch(PA.changeToolSettings(params));
    });

    return () => {
      sub.unsubscribe();
    };
  }, [lineWidth.input.value, majorColor.input.value, minorColor.input.value, fill.input.value]);

  return {
    settings: {
      majorColor: {
        value: majorColor.input.value,
        ref: majorColor.ref,
        changeValue: majorColor.input.changeValue,
      },

      minorColor: {
        value: minorColor.input.value,
        ref: minorColor.ref,
        changeValue: minorColor.input.changeValue,
      },

      lineWidth: {
        value: lineWidth.input.value,
        ref: lineWidth.ref,
        changeValue: lineWidth.input.changeValue,
      },

      fill: {
        value: fill.input.value,
        ref: fill.ref,
        changeValue: fill.input.changeValue,
      },

      lightness: {
        value: lightness.input.value,
        ref: lightness.ref,
        changeValue: lightness.input.changeValue,
      },

      saturation: {
        value: saturation.input.value,
        ref: saturation.ref,
        changeValue: saturation.input.changeValue,
      },

      effectSpeed: {
        value: effectSpeed.input.value,
        ref: effectSpeed.ref,
        changeValue: effectSpeed.input.changeValue,
      },
    },

    tools,
  };
};
