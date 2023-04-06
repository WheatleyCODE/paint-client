import { Observable } from 'rxjs';
import { Brush } from '../Brush';
import { Change, EffectTypes } from '../../types';
import { ToolBuilder } from './ToolBuilder';
import { colors, mockSettings } from '../../consts';

export class BrushBuilder extends ToolBuilder {
  protected tool: Brush;

  constructor($shield: HTMLDivElement, $canvas: HTMLCanvasElement) {
    super();

    const mock$ = new Observable<Change>();
    const mockSocketNext = () => {};

    this.tool = new Brush(
      $shield,
      $canvas,
      mock$,
      colors.YELLOW,
      mock$,
      colors.YELLOW,
      mock$,
      mockSettings.lineWidth,
      mock$,
      mockSettings.lightness,
      mock$,
      mockSettings.saturation,
      mock$,
      mockSettings.effectSpeed,
      mockSocketNext
    );
  }

  setEffects(effects: EffectTypes[]) {
    this.tool.setEffects(effects);
    return this;
  }

  setLightness$(lightness$: Observable<Change>) {
    this.tool.setLightness$(lightness$);
    return this;
  }

  setInitLightness$(initLightness: number) {
    this.tool.setInitLightness(initLightness);
    return this;
  }

  setSaturation$(saturation$: Observable<Change>) {
    this.tool.setSaturation$(saturation$);
    return this;
  }

  setInitSaturation$(saturation: number) {
    this.tool.setInitSaturation(saturation);
    return this;
  }

  setEffectSpeed$(effectSpeed$: Observable<Change>) {
    this.tool.setEffectSpeed$(effectSpeed$);
    return this;
  }

  setInitEffectSpeed(effectSpeed: number) {
    this.tool.setInitEffectSpeed(effectSpeed);
    return this;
  }

  setChangeLineWidth(change: (num: number) => void) {
    this.tool.setChangeLineWidth(change);
    return this;
  }

  build() {
    return this.tool;
  }
}
