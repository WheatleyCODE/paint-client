import { useEffect, useRef, useState } from 'react';
import { filter, fromEvent, map, switchMap, takeLast, takeUntil, tap } from 'rxjs';
import { getClientCoords } from '../../utils';
import { MOUSE_CENTER } from '../../consts';

export const useCanvasMove = () => {
  const canvasMain = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const div = canvasMain.current;
    if (!div) return;

    const mouseDown$ = fromEvent<MouseEvent>(div, 'mousedown');
    const mouseMove$ = fromEvent<MouseEvent>(div, 'mousemove');
    const mouseUp$ = fromEvent<MouseEvent>(div, 'mouseup');
    const mouseOut$ = fromEvent<MouseEvent>(div, 'mouseup');

    const mouseUpSub = mouseUp$.subscribe(() => {
      setIsActive(false);
    });

    const mouseOutSub = mouseOut$.subscribe(() => {
      setIsActive(false);
    });

    const streamMouseMove$ = mouseMove$.pipe(
      map(getClientCoords),
      takeUntil(mouseUp$),
      takeUntil(mouseOut$)
    );

    const streamMouseDown$ = mouseDown$.pipe(
      tap((e) => e.preventDefault()),
      map((e) => {
        const { scrollLeft, scrollTop } = div;

        return {
          x: e.clientX,
          y: e.clientY,
          scrollLeft,
          scrollTop,
          isActive: e.buttons === MOUSE_CENTER,
        };
      }),

      switchMap((startCoords) => {
        return streamMouseMove$.pipe(
          map((coords) => ({ startCoords, coords })),
          filter((value) => value.startCoords.isActive),
          tap(({ coords }) => {
            setIsActive(true);
            const speed = 1.2;

            const resX = Math.floor(startCoords.x - coords.x) * speed;
            const resY = Math.floor(startCoords.y - coords.y) * speed;

            div.scrollLeft = startCoords.scrollLeft + resX;
            div.scrollTop = startCoords.scrollTop + resY;
          }),

          takeLast(1)
        );
      })
    );

    const mouseDownSub = streamMouseDown$.subscribe(() => {
      setIsActive(false);
    });

    return () => {
      mouseDownSub.unsubscribe();
      mouseUpSub.unsubscribe();
      mouseOutSub.unsubscribe();
    };
  }, []);

  return {
    canvasMain,
    isActive,
  };
};
