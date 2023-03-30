import { Observable, Observer } from 'rxjs';
import { Events } from './Events';

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
    return new Observable((observer: Observer<HTMLImageElement>) => {
      const img = new Image();
      img.src = this.saved;

      img.onload = () => {
        observer.next(img);
        observer.complete();
      };

      img.onerror = (err) => {
        observer.error(err);
      };
    });
  }
}
