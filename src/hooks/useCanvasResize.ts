import { useEffect, useRef } from 'react';
import { fromEvent, map, switchMap, takeLast, takeUntil, tap } from 'rxjs';
import { useParams } from 'react-router-dom';
import { useTypedDispatch, useTypedSelector } from './redux';
import { paintActions } from '../store';
import { RESIZER_WIDTH } from '../consts';
import { useCanvas } from './useCanvas';
import { getStreamOnloadImg } from '../utils';
import { useSocket } from './useSocket';
import { ISocketPayloadResize, SocketMethods, ToolTypes } from '../types';

// Todo Refactor hooks

// Todo Refactor logic

// Todo draw Schema draw.io

export const useCanvasResize = () => {
  const params = useParams();
  const { canvas, setImageResize } = useCanvas();
  const { socketNext, socketSend, socket } = useSocket();
  const { username } = useTypedSelector((state) => state.paint);
  const dispatch = useTypedDispatch();
  const rightRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const right = rightRef.current;
    const bottom = bottomRef.current;

    if (!right || !bottom) return;

    const bottomMouseDown$ = fromEvent<MouseEvent>(bottom, 'mousedown');
    const rightMouseDown$ = fromEvent<MouseEvent>(right, 'mousedown');

    const mouseMove$ = fromEvent<MouseEvent>(document.body, 'mousemove');
    const mouseUp$ = fromEvent<MouseEvent>(document.body, 'mouseup');

    const streamMouseMove$ = mouseMove$.pipe(
      map((e) => ({ x: e.clientX, y: e.clientY })),
      takeUntil(mouseUp$)
    );

    const streamBottomMouseDown$ = bottomMouseDown$.pipe(
      tap((e) => e.stopPropagation()),
      map((e) => ({ y: e.clientY })),
      switchMap((startCoords) => {
        return streamMouseMove$.pipe(
          map((coords) => ({ startCoords, coords })),
          tap(({ coords }) => {
            const res = startCoords.y - coords.y;
            bottom.style.bottom = `${res - RESIZER_WIDTH}px`;
            bottom.style.opacity = '1';
          }),
          takeLast(1)
        );
      })
    );

    const streamRightMouseDown$ = rightMouseDown$.pipe(
      tap((e) => e.stopPropagation()),
      map((e) => ({ x: e.clientX })),
      switchMap((startCoords) => {
        return streamMouseMove$.pipe(
          map((coords) => ({ startCoords, coords })),
          tap(({ coords }) => {
            const res = startCoords.x - coords.x;
            right.style.right = `${res - RESIZER_WIDTH}px`;
            right.style.opacity = '1';
          }),
          takeLast(1)
        );
      })
    );

    const bottomSubscription = streamBottomMouseDown$.subscribe(({ startCoords, coords }) => {
      const res = coords.y - startCoords.y;
      bottom.style.bottom = `-${RESIZER_WIDTH}px`;
      bottom.style.opacity = '0';

      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;

      const image = canvas.toDataURL();
      const onload$ = getStreamOnloadImg(image);
      const { height, width } = canvas;
      const sHeight = res < 0 ? height - res : height;
      const sWidth = width;
      const newWidth = width;
      const newHeight = height + res;

      const payload: ISocketPayloadResize = {
        type: ToolTypes.NONE,
        params: {
          width: newWidth,
          height: newHeight,
          sWidth,
          sHeight,
        },
      };

      socketNext(SocketMethods.RESIZE, payload);

      onload$.subscribe((img) => {
        dispatch(paintActions.setCanvasSize({ width: newWidth, height: newHeight }));

        setTimeout(() => {
          setImageResize(img, width, height, sWidth, sHeight);
        }, 0);
      });
    });

    const rightSubscription = streamRightMouseDown$.subscribe(({ startCoords, coords }) => {
      const res = coords.x - startCoords.x;
      right.style.right = `-${RESIZER_WIDTH}px`;
      right.style.opacity = '0';

      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;

      const image = canvas.toDataURL();
      const onload$ = getStreamOnloadImg(image);
      const { height, width } = canvas;

      const sHeight = height;
      const sWidth = res < 0 ? width - res : width;
      const newWidth = width + res;
      const newHeight = height;

      const payload: ISocketPayloadResize = {
        type: ToolTypes.NONE,
        params: {
          width: newWidth,
          height: newHeight,
          sWidth,
          sHeight,
        },
      };

      socketNext(SocketMethods.RESIZE, payload);

      onload$.subscribe((img) => {
        dispatch(paintActions.setCanvasSize({ width: newWidth, height: newHeight }));

        setTimeout(() => {
          setImageResize(img, width, height, sWidth, sHeight);
        }, 0);
      });
    });

    // eslint-disable-next-line consistent-return
    return () => {
      rightSubscription.unsubscribe();
      bottomSubscription.unsubscribe();
    };
  }, [canvas, username, socket]);

  return {
    rightRef,
    bottomRef,
  };
};
