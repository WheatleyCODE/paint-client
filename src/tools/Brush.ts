import { filter, map, Observable, pairwise, switchMap, takeUntil, withLatestFrom } from 'rxjs';
import { Tool } from './abstract/Tool';
import { createStream, checkMouseButton, getOffsetCoords } from '../utils';
import {
  Change,
  EffectTypes,
  IBrush,
  IDrawBrushParams,
  SocketMethods,
  SocketPayload,
  ToolTypes,
} from '../types';

export class Brush extends Tool implements IBrush {
  type = ToolTypes.BRUSH;

  protected lightness$: Observable<Change>;
  protected initLightness: number;

  protected saturation$: Observable<Change>;
  protected initSaturation: number;

  protected effectSpeed$: Observable<Change>;
  protected initEffectSpeed: number;

  protected effects: EffectTypes[] = [];
  protected rainbowMax = 3600;
  protected rainbowIteration = 0;

  protected resizeMax = 1000;
  protected resizeIteration = 100;
  protected resizeIsReverse = false;

  protected lowMax = 1000;
  protected bigIteration = 1000;
  protected lowIteration = 0;

  protected changeLineWidth?: (num: number) => void;
  protected socketNext: (method: SocketMethods, payload: SocketPayload) => void;

  constructor(
    $shield: HTMLDivElement,
    $canvas: HTMLCanvasElement,
    majorColor$: Observable<Change>,
    initMajorColor: string,
    minorColor$: Observable<Change>,
    initMinorColor: string,
    lineWidth$: Observable<Change>,
    initLineWidth: number,
    lightness$: Observable<Change>,
    initLightness: number,
    saturation$: Observable<Change>,
    initSaturation: number,
    effectSpeed$: Observable<Change>,
    initEffectSpeed: number,
    socketNext: (method: SocketMethods, payload: SocketPayload) => void
  ) {
    super(
      $shield,
      $canvas,
      majorColor$,
      initMajorColor,
      minorColor$,
      initMinorColor,
      lineWidth$,
      initLineWidth
    );

    this.lightness$ = lightness$;
    this.initLightness = initLightness;
    this.saturation$ = saturation$;
    this.initSaturation = initSaturation;
    this.effectSpeed$ = effectSpeed$;
    this.initEffectSpeed = initEffectSpeed;
    this.socketNext = socketNext;
  }

  init(): void {
    const majorColorStream$ = createStream(this.majorColor$, this.initMajorColor);
    const minorColorStream$ = createStream(this.minorColor$, this.initMinorColor);

    const lineWidthStream$ = createStream(this.lineWidth$, String(this.initLineWidth));
    const lightnessStream$ = createStream(this.lightness$, String(this.initLightness));
    const saturationStream$ = createStream(this.saturation$, String(this.initSaturation));
    const effectSpeedStream$ = createStream(this.effectSpeed$, String(this.initEffectSpeed));

    this.mouseUp$.subscribe(() => {
      this.lowIteration = 0;
      this.bigIteration = 1000;
    });

    const streamMouseMove$ = this.mouseMove$.pipe(
      map(getOffsetCoords),
      pairwise(),
      takeUntil(this.mouseUp$),
      takeUntil(this.mouseOut$)
    );

    const streamMouseDown$ = this.mouseDown$.pipe(
      map(checkMouseButton),
      filter((a) => !a.isDisable),
      withLatestFrom(
        majorColorStream$,
        minorColorStream$,
        lineWidthStream$,
        lightnessStream$,
        saturationStream$,
        effectSpeedStream$,
        ({ isReverse }, majorColor, minorColor, lineWidth, lightness, saturation, effectSpeed) => ({
          majorColor,
          minorColor,
          lineWidth,
          lightness,
          saturation,
          effectSpeed,
          isReverse,
        })
      ),
      switchMap((options) => {
        return streamMouseMove$.pipe(map((coords) => ({ coords, options })));
      })
    );

    const subscriptionMouseDown = streamMouseDown$.subscribe(({ coords, options }) => {
      const [from, to] = coords;
      const { lineWidth, majorColor, minorColor, isReverse, lightness, saturation, effectSpeed } =
        options;

      const params: IDrawBrushParams = {
        lineWidth: Number(lineWidth),
        strokeStyle: isReverse ? minorColor : majorColor,
        fromX: from.x,
        fromY: from.y,
        toX: to.x,
        toY: to.y,
      };

      const paramEffects = this.applyEffects(params, effectSpeed, saturation, lightness);

      this.socketNext(SocketMethods.DRAW, {
        type: ToolTypes.BRUSH,
        params: paramEffects,
      });

      Brush.draw(this.canvasCtx, paramEffects);
    });

    this.subs.push(subscriptionMouseDown);
  }

  protected applyEffects(
    params: IDrawBrushParams,
    effectSpeed: string,
    saturation: string,
    lightness: string
  ): IDrawBrushParams {
    const newParams = { ...params };
    const speed = Number(effectSpeed);

    if (this.rainbowIteration > this.rainbowMax) {
      this.rainbowIteration = 0;
    }

    if (this.resizeIteration < 100) {
      this.resizeIsReverse = false;
    }

    if (this.resizeIteration > this.resizeMax) {
      this.resizeIsReverse = true;
    }

    this.effects.forEach((effect) => {
      if (effect === EffectTypes.RAINBOW) {
        this.rainbowIteration += speed;
        newParams.strokeStyle = `hsl(${this.rainbowIteration / 10}, ${saturation}%, ${lightness}%)`;
      }

      if (effect === EffectTypes.RESIZE && this.changeLineWidth) {
        if (this.resizeIsReverse) {
          this.resizeIteration -= speed;
        } else {
          this.resizeIteration += speed;
        }

        newParams.lineWidth = this.resizeIteration / 10;
        this.changeLineWidth(this.resizeIteration / 10);
      }

      if (effect === EffectTypes.LOW_TO_BIG && this.changeLineWidth) {
        if (this.lowIteration !== this.lowMax) {
          this.lowIteration += speed / 2;
        }

        newParams.lineWidth = this.lowIteration / 10;
        this.changeLineWidth(this.lowIteration / 10);
      }

      if (effect === EffectTypes.BIG_TO_LOW && this.changeLineWidth) {
        if (this.bigIteration > 0) {
          this.bigIteration -= speed / 2;
        }

        newParams.lineWidth = this.bigIteration / 10;
        this.changeLineWidth(this.bigIteration / 10);
      }
    });

    return newParams;
  }

  static draw(canvasCtx: CanvasRenderingContext2D, params: IDrawBrushParams): void {
    const { lineWidth, strokeStyle, fromY, fromX, toY, toX } = params;
    canvasCtx.lineWidth = lineWidth;
    canvasCtx.strokeStyle = strokeStyle;
    canvasCtx.beginPath();
    canvasCtx.moveTo(fromX, fromY);
    canvasCtx.lineTo(toX, toY);
    canvasCtx.lineCap = 'round';
    canvasCtx.lineJoin = 'round';
    canvasCtx.stroke();
  }

  setEffects(effects: EffectTypes[]) {
    this.effects = effects;
  }

  getEffects(): EffectTypes[] {
    return this.effects;
  }

  setLightness$(lightness$: Observable<Change>) {
    this.lightness$ = lightness$;
  }

  setInitLightness(initLightness: number) {
    this.initLightness = initLightness;
  }

  setSaturation$(saturation$: Observable<Change>) {
    this.saturation$ = saturation$;
  }

  setInitSaturation(saturation: number) {
    this.initSaturation = saturation;
  }

  setEffectSpeed$(effectSpeed$: Observable<Change>) {
    this.effectSpeed$ = effectSpeed$;
  }

  setInitEffectSpeed(effectSpeed: number) {
    this.initEffectSpeed = effectSpeed;
  }

  setChangeLineWidth(change: (num: number) => void) {
    this.changeLineWidth = change;
  }

  setSocketNext(socketNext: (method: SocketMethods, payload: SocketPayload) => void) {
    this.socketNext = socketNext;
  }
}
