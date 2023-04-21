import { ChangeEvent, useEffect, useState } from 'react';
import { debounceTime, filter, fromEvent, map, Observable } from 'rxjs';
import { Change } from '../../types/toolbar.interfaces';
import { IPainToolSettings } from './usePaintToolSettings';

export interface IPaintObservables {
  majorColor$?: Observable<ChangeEvent<HTMLInputElement>>;
  minorColor$?: Observable<ChangeEvent<HTMLInputElement>>;
  lineWidth$?: Observable<ChangeEvent<HTMLInputElement>>;
  fill$?: Observable<ChangeEvent<HTMLInputElement>>;
  lightness$?: Observable<ChangeEvent<HTMLInputElement>>;
  saturation$?: Observable<ChangeEvent<HTMLInputElement>>;
  effectSpeed$?: Observable<ChangeEvent<HTMLInputElement>>;
}

export const usePaintObservables = (settings: IPainToolSettings) => {
  const [observables, setObservables] = useState<IPaintObservables>({});

  useEffect(() => {
    const majorColorElem = settings.majorColor.ref.current;
    const minorColorElem = settings.minorColor.ref.current;
    const lineWidthElem = settings.lineWidth.ref.current;
    const fillElem = settings.fill.ref.current;
    const lightnessElem = settings.lightness.ref.current;
    const saturationElem = settings.saturation.ref.current;
    const effectSpeedElem = settings.effectSpeed.ref.current;

    if (!majorColorElem || !minorColorElem || !lineWidthElem) return;
    if (!fillElem || !lightnessElem || !saturationElem || !effectSpeedElem) return;

    const majorColor$ = fromEvent<Change>(majorColorElem, 'input');
    const minorColor$ = fromEvent<Change>(minorColorElem, 'input');
    const lineWidth$ = fromEvent<Change>(lineWidthElem, 'input');
    const fill$ = fromEvent<Change>(fillElem, 'change');
    const lightness$ = fromEvent<Change>(lightnessElem, 'input');
    const saturation$ = fromEvent<Change>(saturationElem, 'input');
    const effectSpeed$ = fromEvent<Change>(effectSpeedElem, 'input');

    const streamMajorColor$ = majorColor$.pipe(
      map((e) => ({ majorColor: e.target.value })),
      debounceTime(100)
    );
    const streamMinorColor$ = minorColor$.pipe(
      map((e) => ({ minorColor: e.target.value })),
      debounceTime(100)
    );
    const streamLineWidth$ = lineWidth$.pipe(
      map((e) => ({ lineWidth: +e.target.value })),
      filter(({ lineWidth }) => lineWidth % 2 === 0)
    );

    const streamLightness$ = lightness$.pipe(
      map((e) => ({ lightness: +e.target.value })),
      filter(({ lightness }) => lightness % 2 === 0)
    );
    const streamSaturation$ = saturation$.pipe(
      map((e) => ({ saturation: +e.target.value })),
      filter(({ saturation }) => saturation % 2 === 0)
    );

    const streamEffectSpeed$ = effectSpeed$.pipe(map((e) => ({ effectSpeed: +e.target.value })));

    setObservables(() => ({
      lineWidth$,
      majorColor$,
      minorColor$,
      fill$,
      lightness$,
      saturation$,
      effectSpeed$,
    }));

    const effectSpeedSub = streamEffectSpeed$.subscribe(({ effectSpeed }) => {
      settings.effectSpeed.input.changeValue(effectSpeed);
    });

    const lightnessSub = streamLightness$.subscribe(({ lightness }) => {
      settings.lightness.input.changeValue(lightness);
    });

    const saturationSub = streamSaturation$.subscribe(({ saturation }) => {
      settings.saturation.input.changeValue(saturation);
    });

    const majorColorSub = streamMajorColor$.subscribe(({ majorColor }) => {
      settings.majorColor.input.changeValue(majorColor);
    });

    const minorColorSub = streamMinorColor$.subscribe(({ minorColor }) => {
      settings.minorColor.input.changeValue(minorColor);
    });

    const lineWidthSub = streamLineWidth$.subscribe(({ lineWidth }) => {
      settings.lineWidth.input.changeValue(lineWidth);
    });

    return () => {
      effectSpeedSub?.unsubscribe();
      lightnessSub?.unsubscribe();
      saturationSub?.unsubscribe();
      majorColorSub?.unsubscribe();
      minorColorSub?.unsubscribe();
      lineWidthSub?.unsubscribe();
    };
  }, []);

  return {
    observables,
  };
};
