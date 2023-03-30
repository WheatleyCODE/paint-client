import { Observable } from 'rxjs';
import { Events } from './Events';
import { getStreamOnloadImg } from '../../utils/stream.utils';

export abstract class Canvas extends Events {
  protected $canvas: HTMLCanvasElement;
  protected canvasCtx: CanvasRenderingContext2D;
  protected canvasRect: DOMRect;
  protected scale: number;
  protected saved = '';

  constructor($canvas: HTMLCanvasElement) {
    super($canvas);
    this.$canvas = $canvas;
    this.canvasCtx = $canvas.getContext('2d') as CanvasRenderingContext2D;
    this.canvasRect = $canvas.getBoundingClientRect();
    this.scale = window.devicePixelRatio;
  }

  protected save(): void {
    this.saved = this.$canvas.toDataURL();
  }

  protected copy(): Observable<HTMLImageElement> {
    return getStreamOnloadImg(this.saved);
  }
}
