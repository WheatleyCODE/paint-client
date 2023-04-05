import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { filter, fromEvent, map } from 'rxjs';
import { paintActions as PA } from '../../store';
import { useTypedDispatch, useTypedSelector } from '../redux';
import { useValidInput } from '../useValidInput';
import { ITools, useTools } from './useTools';
import { Change, ChangeTSFilds, IObservables, ShapeFillTypes } from '../../types';

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
}

export interface IPaint {
  tools: ITools;
  settings: ISettings;
}

const streamMouseUp$ = fromEvent(document, 'mouseup');

export const usePaint = (): IPaint => {
  const { toolSettings, changeStep } = useTypedSelector((state) => state.paint);
  const dispatch = useTypedDispatch();

  const lineWidthInput = useValidInput(toolSettings.lineWidth);
  const fillInput = useValidInput(toolSettings.currentShapeFillType);
  const majorColorInput = useValidInput(toolSettings.majorColor);
  const minorColorInput = useValidInput(toolSettings.minorColor);

  const majorColorRef = useRef<HTMLInputElement | null>(null);
  const minorColorRef = useRef<HTMLInputElement | null>(null);
  const lineWidthRef = useRef<HTMLInputElement | null>(null);
  const fillRef = useRef<HTMLInputElement | null>(null);

  const [observables, setObservables] = useState<IObservables>({});
  const tools = useTools(observables);

  useEffect(() => {
    const majorColor = majorColorRef.current;
    const minorColor = minorColorRef.current;
    const line = lineWidthRef.current;
    const fill = fillRef.current;

    if (majorColor && minorColor && line && fill) {
      const majorColor$ = fromEvent<Change>(majorColor, 'input');
      const minorColor$ = fromEvent<Change>(minorColor, 'input');
      const lineWidth$ = fromEvent<Change>(line, 'input');
      const fill$ = fromEvent<Change>(fill, 'change');

      setObservables({ lineWidth$, majorColor$, minorColor$, fill$ });
    }
  }, []);

  useEffect(() => {
    const { lineWidth$, fill$, majorColor$, minorColor$ } = observables;
    if (!lineWidth$ || !fill$ || !majorColor$ || !minorColor$) return;

    const streamMajorColor$ = majorColor$.pipe(map((e) => ({ majorColor: e.target.value })));
    const streamMinorColor$ = minorColor$.pipe(map((e) => ({ minorColor: e.target.value })));
    const streamLineWidth$ = lineWidth$.pipe(
      map((e) => ({ lineWidth: +e.target.value })),
      filter(({ lineWidth }) => lineWidth % changeStep === 0)
    );

    streamMajorColor$.subscribe(({ majorColor }) => majorColorInput.changeValue(majorColor));
    streamMinorColor$.subscribe(({ minorColor }) => minorColorInput.changeValue(minorColor));
    streamLineWidth$.subscribe(({ lineWidth }) => lineWidthInput.changeValue(lineWidth));
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
    },

    tools,
  };
};
