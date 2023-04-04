import { Observable } from 'rxjs';
import { Events } from './Events';
import { getStreamOnloadImg } from '../../utils';

export abstract class Canvas extends Events {
  protected $canvas: HTMLCanvasElement;
  protected canvasCtx: CanvasRenderingContext2D;
  protected canvasRect: DOMRect;
  protected saved = '';

  constructor($shield: HTMLDivElement, $canvas: HTMLCanvasElement) {
    super($shield);

    this.$canvas = $canvas;
    this.canvasCtx = $canvas.getContext('2d') as CanvasRenderingContext2D;
    this.canvasRect = $canvas.getBoundingClientRect();
  }

  protected save(): void {
    this.saved = this.$canvas.toDataURL();
  }

  protected copy(): Observable<HTMLImageElement> {
    return getStreamOnloadImg(this.saved);
  }
}
