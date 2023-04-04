import { Observable } from 'rxjs';
import { Brush } from '../Brush';
import { Change } from '../../types';
import { ToolBuilder } from './ToolBuilder';

export class BrushBuilder extends ToolBuilder {
  protected tool: Brush;

  constructor($shield: HTMLDivElement, $canvas: HTMLCanvasElement) {
    super();

    const obs$ = new Observable<Change>();
    const socketNext = () => {};

    this.tool = new Brush($shield, $canvas, obs$, '#fafafa', obs$, '#fafafa', obs$, 10, socketNext);
  }

  build() {
    return this.tool;
  }
}
