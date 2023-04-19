import { initialState, paintActions, paintSlice } from './paint.slice';
import { EffectTypes, ToolTypes } from '../../types';

const { reducer } = paintSlice;

describe('Paint reducer - обычные', () => {
  test('Установка пользователя', () => {
    const action = paintActions.setUsername('Василий');

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      username: 'Василий',
    });
  });

  test('Изменение размеров canvas', () => {
    const action = paintActions.setCanvasSize({ width: 100, height: 200 });

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      canvasSettings: {
        width: 100,
        height: 200,
      },
    });
  });

  test('Установка эффекта для кисти', () => {
    const action = paintActions.setCurrentEffect(EffectTypes.RAINBOW);

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      currentEffect: EffectTypes.RAINBOW,
    });
  });

  test('Установка текущего инструмента', () => {
    const action = paintActions.setCurrentTool(ToolTypes.RECT);

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      currentTool: ToolTypes.RECT,
    });
  });

  test('Установка подключенных пользователей', () => {
    const action = paintActions.setConnections(['Василий', 'Дмитрий']);

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      connections: ['Василий', 'Дмитрий'],
    });
  });

  test('Добавление подключенного пользователя', () => {
    const action = paintActions.setConnections(['Дмитрий']);

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      connections: ['Дмитрий'],
    });
  });

  test('Изменение настроек инструмента', () => {
    const action = paintActions.changeToolSettings({ lineWidth: 50, majorColor: '#fafafa' });

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      toolSettings: { ...initialState.toolSettings, lineWidth: 50, majorColor: '#fafafa' },
    });
  });
});

describe('Paint reducer - восстановление', () => {
  const saveData11 = [
    { height: 10, image: 'img', width: 20 },
    { height: 10, image: 'img', width: 20 },
    { height: 10, image: 'img', width: 20 },
    { height: 10, image: 'img', width: 20 },
    { height: 10, image: 'img', width: 20 },
    { height: 10, image: 'img', width: 20 },
    { height: 10, image: 'img', width: 20 },
    { height: 10, image: 'img', width: 20 },
    { height: 10, image: 'img', width: 20 },
    { height: 10, image: 'img', width: 20 },
    { height: 10, image: 'img', width: 20 },
  ];

  test('Добавление в Undo', () => {
    const action = paintActions.pushToUndo({ height: 100, image: 'canvasimg', width: 200 });

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      undoList: [{ height: 100, image: 'canvasimg', width: 200 }],
    });
  });

  test('Добавление в Redo', () => {
    const action = paintActions.pushToRedo({ height: 100, image: 'canvasimg', width: 200 });

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      redoList: [{ height: 100, image: 'canvasimg', width: 200 }],
    });
  });

  test('Добавление в Undo >11', () => {
    const action = paintActions.pushToUndo({ height: 100, image: 'canvasimg', width: 200 });
    const initState = { ...initialState, undoList: saveData11 };

    expect(reducer(initState, action).undoList.length).toEqual(11);
  });

  test('Добавление в Redo >11', () => {
    const action = paintActions.pushToRedo({ height: 100, image: 'canvasimg', width: 200 });
    const initState = { ...initialState, redoList: saveData11 };

    expect(reducer(initState, action).redoList.length).toEqual(11);
  });

  test('Установка Undo', () => {
    const action = paintActions.setUndo([{ height: 100, image: 'canvasimg', width: 200 }]);

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      undoList: [{ height: 100, image: 'canvasimg', width: 200 }],
    });
  });

  test('Установка Redo', () => {
    const action = paintActions.setRedo([{ height: 100, image: 'canvasimg', width: 200 }]);

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      redoList: [{ height: 100, image: 'canvasimg', width: 200 }],
    });
  });

  test('Установка Undo >10', () => {
    const action = paintActions.setUndo([...saveData11]);
    const initState = { ...initialState, undoList: saveData11 };

    expect(reducer(initState, action).undoList.length).toEqual(10);
  });

  test('Установка Redo >10', () => {
    const action = paintActions.setRedo([...saveData11]);
    const initState = { ...initialState, redoList: saveData11 };

    expect(reducer(initState, action).redoList.length).toEqual(10);
  });
});
