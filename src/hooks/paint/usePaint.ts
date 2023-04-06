import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { debounceTime, filter, fromEvent, map } from 'rxjs';
import { paintActions as PA } from '../../store';
import { useTypedDispatch, useTypedSelector } from '../redux';
import { useValidInput } from '../useValidInput';
import { ITools, useTools } from './useTools';
import { Change, ChangeTSFilds, IObservables, ShapeFillTypes, ToolTypes } from '../../types';

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
  const { toolSettings, changeStep, currentTool } = useTypedSelector((state) => state.paint);
  const dispatch = useTypedDispatch();

  const lineWidthInput = useValidInput(toolSettings.lineWidth);
  const fillInput = useValidInput(toolSettings.currentShapeFillType);
  const majorColorInput = useValidInput(toolSettings.majorColor);
  const minorColorInput = useValidInput(toolSettings.minorColor);
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

  const [observables, setObservables] = useState<IObservables>({});
  const tools = useTools({ observables, changeLineWidth: lineWidthInput.changeValue });

  useEffect(() => {
    const majorColor = majorColorRef.current;
    const minorColor = minorColorRef.current;
    const line = lineWidthRef.current;
    const fill = fillRef.current;
    const lightness = lightnessRef.current;
    const saturation = saturationRef.current;
    const effectSpeed = effectSpeedRef.current;

    if (majorColor && minorColor && line && fill && lightness && saturation && effectSpeed) {
      const majorColor$ = fromEvent<Change>(majorColor, 'input');
      const minorColor$ = fromEvent<Change>(minorColor, 'input');
      const lineWidth$ = fromEvent<Change>(line, 'input');
      const fill$ = fromEvent<Change>(fill, 'change');
      const lightness$ = fromEvent<Change>(lightness, 'input');
      const saturation$ = fromEvent<Change>(saturation, 'input');
      const effectSpeed$ = fromEvent<Change>(effectSpeed, 'input');

      setObservables(() => ({
        lineWidth$,
        majorColor$,
        minorColor$,
        fill$,
        lightness$,
        saturation$,
        effectSpeed$,
      }));
    }
  }, []);

  useEffect(() => {
    const { lineWidth$, fill$, majorColor$, minorColor$, lightness$, saturation$, effectSpeed$ } =
      observables;

    const streamMajorColor$ = majorColor$?.pipe(
      map((e) => ({ majorColor: e.target.value })),
      debounceTime(100)
    );
    const streamMinorColor$ = minorColor$?.pipe(
      map((e) => ({ minorColor: e.target.value })),
      debounceTime(100)
    );
    const streamLineWidth$ = lineWidth$?.pipe(
      map((e) => ({ lineWidth: +e.target.value })),
      filter(({ lineWidth }) => lineWidth % changeStep === 0)
    );

    const streamLightness$ = lightness$?.pipe(
      map((e) => ({ lightness: +e.target.value })),
      filter(({ lightness }) => lightness % changeStep === 0)
    );
    const streamSaturation$ = saturation$?.pipe(
      map((e) => ({ saturation: +e.target.value })),
      filter(({ saturation }) => saturation % changeStep === 0)
    );

    const streamEffectSpeed$ = effectSpeed$?.pipe(map((e) => ({ effectSpeed: +e.target.value })));

    const effectSpeedSub = streamEffectSpeed$?.subscribe(({ effectSpeed }) => {
      effectSpeedInput.changeValue(effectSpeed);
    });

    const lightnessSub = streamLightness$?.subscribe(({ lightness }) => {
      lightnessInput.changeValue(lightness);
    });

    const saturationSub = streamSaturation$?.subscribe(({ saturation }) => {
      saturationInput.changeValue(saturation);
    });

    const majorColorSub = streamMajorColor$?.subscribe(({ majorColor }) =>
      majorColorInput.changeValue(majorColor)
    );
    const minorColorSub = streamMinorColor$?.subscribe(({ minorColor }) =>
      minorColorInput.changeValue(minorColor)
    );
    const lineWidthSub = streamLineWidth$?.subscribe(({ lineWidth }) =>
      lineWidthInput.changeValue(lineWidth)
    );

    return () => {
      effectSpeedSub?.unsubscribe();
      lightnessSub?.unsubscribe();
      saturationSub?.unsubscribe();
      majorColorSub?.unsubscribe();
      minorColorSub?.unsubscribe();
      lineWidthSub?.unsubscribe();
    };
  }, [observables]);

  useEffect(() => {
    const params: ChangeTSFilds = {
      lineWidth: lineWidthInput.value,
      majorColor: majorColorInput.value,
      minorColor: minorColorInput.value,
      currentShapeFillType: fillInput.value,
    };

    const sub = streamMouseUp$.subscribe(() => {
      dispatch(PA.changeToolSettings(params));
    });

    return () => {
      sub.unsubscribe();
    };
  }, [lineWidthInput.value, fillInput.value, majorColorInput.value, minorColorInput.value]);

  return {
    settings: {
      majorColor: {
        value: majorColorInput.value,
        ref: majorColorRef,
        changeValue: majorColorInput.changeValue,
      },

      minorColor: {
        value: minorColorInput.value,
        ref: minorColorRef,
        changeValue: minorColorInput.changeValue,
      },

      lineWidth: {
        value: lineWidthInput.value,
        ref: lineWidthRef,
        changeValue: lineWidthInput.changeValue,
      },

      fill: {
        value: fillInput.value,
        ref: fillRef,
        changeValue: fillInput.changeValue,
      },

      lightness: {
        value: lightnessInput.value,
        ref: lightnessRef,
        changeValue: lightnessInput.changeValue,
      },

      saturation: {
        value: saturationInput.value,
        ref: saturationRef,
        changeValue: saturationInput.changeValue,
      },

      effectSpeed: {
        value: effectSpeedInput.value,
        ref: effectSpeedRef,
        changeValue: effectSpeedInput.changeValue,
      },
    },

    tools,
  };
};
