import { useCanvas } from './useCanvas';
import { useTypedDispatch, useTypedSelector } from '../redux';
import { paintActions as PA } from '../../store';
import { getSaveDataCanvas, getStreamOnloadImg } from '../../utils';

export const useCanvasRestore = () => {
  const { canvas, context, drawImageCanvas } = useCanvas();
  const { undoList, redoList } = useTypedSelector((state) => state.paint);
  const dispatch = useTypedDispatch();

  const createSaveCanvasData = (width: number, height: number, cnvs: HTMLCanvasElement) => {
    return {
      width,
      height,
      image: cnvs.toDataURL(),
    };
  };

  const undo = (callback?: (canvas: HTMLCanvasElement) => void) => {
    if (!canvas || !context) return;
    const newUndoList = [...undoList];
    if (newUndoList.length <= 0) return;
    const data = newUndoList.pop();
    if (!data) return;

    const { width, height, image } = data;
    const saveCanvasData = createSaveCanvasData(width, height, canvas);

    dispatch(PA.pushToRedo(saveCanvasData));
    const onload$ = getStreamOnloadImg(image);

    onload$.subscribe((img) => {
      if (canvas.width !== width || canvas.height !== height) {
        drawImageCanvas(img, {
          x: 0,
          y: 0,
          width,
          height,
          sx: 0,
          sy: 0,
          sWidth: width,
          sHeight: height,
        });
      } else {
        drawImageCanvas(img);
      }

      dispatch(PA.setUndo(newUndoList));
      if (callback) callback(canvas);
    });
  };

  const redo = (callback?: (canvas: HTMLCanvasElement) => void) => {
    if (!canvas || !context) return;
    const newRedoList = [...redoList];
    if (newRedoList.length <= 0) return;
    const data = newRedoList.pop();
    if (!data) return;

    const { width, height, image } = data;
    const saveCanvasData = createSaveCanvasData(width, height, canvas);

    dispatch(PA.pushToUndo(saveCanvasData));
    const onload$ = getStreamOnloadImg(image);

    onload$.subscribe((img) => {
      if (canvas.width !== width || canvas.height !== height) {
        drawImageCanvas(img, {
          x: 0,
          y: 0,
          width,
          height,
          sx: 0,
          sy: 0,
          sWidth: width,
          sHeight: height,
        });
      } else {
        drawImageCanvas(img);
      }

      dispatch(PA.setRedo(newRedoList));
      if (callback) callback(canvas);
    });
  };

  const pushToUndo = () => {
    if (!canvas) return;
    const saveData = getSaveDataCanvas(canvas);
    dispatch(PA.pushToUndo(saveData));
  };

  return {
    pushToUndo,
    redo,
    undo,
  };
};
