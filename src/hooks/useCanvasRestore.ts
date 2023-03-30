import { useTypedSelector } from './useTypedSelector';
import { useTypedDispatch } from './useTypedDispatch';
import { getStreamOnloadImg } from '../utils/stream.utils';
import { paintActions as PA } from '../store/paint/paint.slice';

export const useCanvasRestore = ($canvas?: HTMLCanvasElement) => {
  const { undoList, redoList } = useTypedSelector((state) => state.paint);
  const dispatch = useTypedDispatch();

  const undo = () => {
    if (!$canvas) return;
    const ctx = $canvas.getContext('2d');
    const newUndoList = [...undoList];

    if (ctx && newUndoList.length > 0) {
      const data = newUndoList.pop();
      if (!data) return;

      dispatch(PA.pushToRedo($canvas.toDataURL()));
      const onload$ = getStreamOnloadImg(data);

      onload$.subscribe((img) => {
        ctx.clearRect(0, 0, $canvas.width, $canvas.height);
        ctx.drawImage(img, 0, 0, $canvas.width, $canvas.height);
        dispatch(PA.setUndo(newUndoList));
      });
    }
  };

  const redo = () => {
    if (!$canvas) return;
    const ctx = $canvas.getContext('2d');
    const newRedoList = [...redoList];

    if (ctx && newRedoList.length > 0) {
      const data = newRedoList.pop();
      if (!data) return;

      dispatch(PA.pushToUndo($canvas.toDataURL()));
      const onload$ = getStreamOnloadImg(data);

      onload$.subscribe((img) => {
        ctx.clearRect(0, 0, $canvas.width, $canvas.height);
        ctx.drawImage(img, 0, 0, $canvas.width, $canvas.height);
        dispatch(PA.setRedo(newRedoList));
      });
    }
  };

  return {
    undo,
    redo,
  };
};
