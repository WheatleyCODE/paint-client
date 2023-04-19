import { calcTriangle, calcTriangleAngles, generateId } from './paint.utils';

describe('Утилиты Paint компонента', () => {
  test('Генерация ID', () => {
    expect(generateId()).not.toBeNull();
    expect(generateId()).not.toBeUndefined();
  });

  test('Расчет углов треугольника', () => {
    expect(calcTriangleAngles(120, 120, 90)).toEqual([68, 68, 44]);
    expect(calcTriangleAngles(200, 200, 140)).toEqual([70, 70, 41]);
    expect(calcTriangleAngles(300, 100, 300)).toEqual([80, 19, 80]);
  });

  test('Расчет углов треугольника - ошибки', () => {
    expect(calcTriangleAngles(999, 0, 0)).toEqual([NaN, NaN, NaN]);
    expect(calcTriangleAngles(0, 100, 0)).toEqual([NaN, NaN, NaN]);
  });

  test('Расчет параметров треугольника, по высоте и ширине', () => {
    expect(calcTriangle(400, 200)).toEqual({
      sides: { a: 566, b: 566, c: 400 },
      angles: { a: 45, b: 45, c: 90 },
      translateX: 200,
    });

    expect(calcTriangle(600, 300)).toEqual({
      sides: { a: 848, b: 848, c: 600 },
      angles: { a: 45, b: 45, c: 90 },
      translateX: 300,
    });

    expect(calcTriangle(400, 600)).toEqual({
      sides: { a: 1264, b: 1264, c: 400 },
      angles: { a: 72, b: 72, c: 37 },
      translateX: 200,
    });
  });
});
