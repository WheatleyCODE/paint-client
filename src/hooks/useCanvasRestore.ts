import { useContext } from 'react';
import { useTypedSelector, useTypedDispatch } from './redux';
import { PaintContext } from '../components/hoc/PaintContext';
import { paintActions as PA } from '../store/paint/paint.slice';
import { getStreamOnloadImg } from '../utils';
import { ISaveCanvas } from '../types';

export const useCanvasRestore = () => {
  const { canvas } = useContext(PaintContext);
  const { undoList, redoList } = useTypedSelector((state) => state.paint);
  const dispatch = useTypedDispatch();

  const undo = () => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const newUndoList = [...undoList];

    if (ctx && newUndoList.length > 0) {
      const data = newUndoList.pop();
      if (!data) return;

      const saveData: ISaveCanvas = {
        width: data.width,
        height: data.height,
        image: canvas.toDataURL(),
      };

      dispatch(PA.pushToRedo(saveData));
      const onload$ = getStreamOnloadImg(data.image);

      onload$.subscribe((img) => {
        if (canvas.width !== data.width || canvas.height !== data.height) {
          const sWidth = data.width;
          const sHeight = data.height;

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, sWidth, sHeight, 0, 0, sWidth, sHeight);
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
        dispatch(PA.setUndo(newUndoList));
      });
    }
  };

  const redo = () => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const newRedoList = [...redoList];

    if (ctx && newRedoList.length > 0) {
      const data = newRedoList.pop();
      if (!data) return;

      const saveData: ISaveCanvas = {
        width: data.width,
        height: data.height,
        image: canvas.toDataURL(),
      };

      dispatch(PA.pushToUndo(saveData));
      const onload$ = getStreamOnloadImg(data.image);

      onload$.subscribe((img) => {
        if (canvas.width !== data.width || canvas.height !== data.height) {
          const sWidth = data.width;
          const sHeight = data.height;

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, sWidth, sHeight, 0, 0, sWidth, sHeight);
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
        dispatch(PA.setRedo(newRedoList));
      });
    }
  };

  return {
    undo,
    redo,
  };
};
