import { Observable } from 'rxjs';
import { Change, SocketMethods, SocketPayload, Tool } from '../../types';

export abstract class ToolBuilder {
  protected abstract tool: Tool;

  setMajorColor$(obs$: Observable<Change>) {
    this.tool.setMajorColor$(obs$);
    return this;
  }

  setInitMajorColor(majorColor: string) {
    this.tool.setInitMajorColor$(majorColor);
    return this;
  }

  setMinorColor$(obs$: Observable<Change>) {
    this.tool.setMinorColor$(obs$);
    return this;
  }

  setInitMinorColor(minorColor: string) {
    this.tool.setInitMinorColor$(minorColor);
    return this;
  }

  setLineWidth$(obs$: Observable<Change>) {
    this.tool.setLineWidth$(obs$);
    return this;
  }

  setInitLineWidth(lineWidth: number) {
    this.tool.setInitLineWidth(lineWidth);
    return this;
  }

  setSocketNext(socketNext: (method: SocketMethods, payload: SocketPayload) => void) {
    this.tool.setSocketNext(socketNext);
    return this;
  }

  abstract build(): Tool;
}
