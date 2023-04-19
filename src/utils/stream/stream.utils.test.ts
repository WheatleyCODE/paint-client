import {
  checkMouseButton,
  checkMouseButtonAndGetOffsetCoords,
  getClientCoords,
  getOffsetCoords,
} from './stream.utils';

describe('Утилиты для RxJS', () => {
  test('Проверка нажатой кнопки мыши - левая, правая', () => {
    expect(checkMouseButton(<MouseEvent>{ buttons: 1 })).toEqual({
      isDisable: false,
      isReverse: false,
    });

    expect(checkMouseButton(<MouseEvent>{ buttons: 2 })).toEqual({
      isDisable: false,
      isReverse: true,
    });
  });

  test('Проверка нажатой кнопки мыши - любая другая', () => {
    expect(checkMouseButton(<MouseEvent>{ buttons: 0 })).toEqual({
      isDisable: true,
      isReverse: false,
    });

    expect(checkMouseButton(<MouseEvent>{ buttons: 3 })).toEqual({
      isDisable: true,
      isReverse: false,
    });

    expect(checkMouseButton(<MouseEvent>{ buttons: 4 })).toEqual({
      isDisable: true,
      isReverse: false,
    });
  });

  test('Получение client coords', () => {
    expect(getClientCoords(<MouseEvent>{ clientY: 10, clientX: 20 })).toEqual({ y: 10, x: 20 });
    expect(getClientCoords(<MouseEvent>{ clientY: 100, clientX: 200 })).toEqual({ y: 100, x: 200 });
  });

  test('Получение offset coords', () => {
    expect(getOffsetCoords(<MouseEvent>{ offsetY: 10, offsetX: 20 })).toEqual({ y: 10, x: 20 });
    expect(getOffsetCoords(<MouseEvent>{ offsetY: 100, offsetX: 200 })).toEqual({ y: 100, x: 200 });
  });

  test('Проверка нажатой кнопки мыши координат - левая, правая', () => {
    expect(
      checkMouseButtonAndGetOffsetCoords(<MouseEvent>{ offsetY: 100, offsetX: 200, buttons: 1 })
    ).toEqual({
      isDisable: false,
      isReverse: false,
      startCoords: {
        y: 100,
        x: 200,
      },
    });

    expect(
      checkMouseButtonAndGetOffsetCoords(<MouseEvent>{ offsetY: 10, offsetX: 20, buttons: 1 })
    ).toEqual({
      isDisable: false,
      isReverse: false,
      startCoords: {
        y: 10,
        x: 20,
      },
    });

    expect(
      checkMouseButtonAndGetOffsetCoords(<MouseEvent>{ offsetY: 100, offsetX: 200, buttons: 2 })
    ).toEqual({
      isDisable: false,
      isReverse: true,
      startCoords: {
        y: 100,
        x: 200,
      },
    });

    expect(
      checkMouseButtonAndGetOffsetCoords(<MouseEvent>{ offsetY: 10, offsetX: 20, buttons: 2 })
    ).toEqual({
      isDisable: false,
      isReverse: true,
      startCoords: {
        y: 10,
        x: 20,
      },
    });
  });

  test('Проверка нажатой кнопки мыши и координат - любая другая', () => {
    expect(
      checkMouseButtonAndGetOffsetCoords(<MouseEvent>{ offsetY: 999, offsetX: 666, buttons: 0 })
    ).toEqual({
      isDisable: true,
      isReverse: false,
      startCoords: {
        y: 999,
        x: 666,
      },
    });

    expect(
      checkMouseButtonAndGetOffsetCoords(<MouseEvent>{ offsetY: 99, offsetX: 66, buttons: 3 })
    ).toEqual({
      isDisable: true,
      isReverse: false,
      startCoords: {
        y: 99,
        x: 66,
      },
    });

    expect(
      checkMouseButtonAndGetOffsetCoords(<MouseEvent>{ offsetY: 500, offsetX: 500, buttons: 4 })
    ).toEqual({
      isDisable: true,
      isReverse: false,
      startCoords: {
        y: 500,
        x: 500,
      },
    });
  });
});
