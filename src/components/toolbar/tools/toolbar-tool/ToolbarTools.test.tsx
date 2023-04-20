import { ToolbarTools } from './ToolbarTools';
import { ITools } from '../../../../hooks/paint/usePaintTools';
import { renderWithProviders } from '../../../../utils/tests/renderWithProviders';
import { EffectTypes, ToolTypes } from '../../../../types';
import { initialState } from '../../../../store/paint/paint.slice';

function getIndexActiveClass(arr: HTMLElement[]): number {
  return arr
    .map((tool) => {
      return tool.className.indexOf('active') === -1 ? '' : 'active';
    })
    .findIndex((str) => str === 'active');
}

describe('Панель инструментов', () => {
  test('Заголовки', () => {
    const { getByText } = renderWithProviders(<ToolbarTools tools={{} as unknown as ITools} />);

    const toolTitle = getByText(/tools/i);
    const toolBrush = getByText(/brush effects/i);

    expect(toolTitle).toBeInTheDocument();
    expect(toolBrush).toBeInTheDocument();
  });

  test('Инструменты и эффекты', () => {
    const { getAllByTestId } = renderWithProviders(
      <ToolbarTools tools={{} as unknown as ITools} />
    );

    const tools = getAllByTestId('tool-button');
    const effects = getAllByTestId('button');

    expect(tools.length).toBe(8);
    expect(effects.length).toBe(4);
  });

  test('Активные Инструменты - NONE', () => {
    const { getAllByTestId } = renderWithProviders(
      <ToolbarTools tools={{} as unknown as ITools} />
    );

    const tools = getAllByTestId('tool-button');
    const actives = tools
      .map((tool) => {
        if (tool.className.indexOf('active') === -1) {
          return '';
        }

        return 'active';
      })
      .findIndex((str) => str === 'active');

    expect(actives).toBe(-1);
    expect(tools.length).toBe(8);
  });

  test('Активные Инструменты - TRIANGLE', () => {
    const { getAllByTestId } = renderWithProviders(
      <ToolbarTools tools={{ current: { type: ToolTypes.TRIANGLE } } as unknown as ITools} />
    );

    const tools = getAllByTestId('tool-button');
    const activeIndex = getIndexActiveClass(tools);

    expect(activeIndex).toBe(3);
    expect(tools.length).toBe(8);
  });

  test('Активные Инструменты - RECT', () => {
    const { getAllByTestId } = renderWithProviders(
      <ToolbarTools tools={{ current: { type: ToolTypes.RECT } } as unknown as ITools} />
    );

    const tools = getAllByTestId('tool-button');
    const activeIndex = getIndexActiveClass(tools);

    expect(activeIndex).toBe(1);
    expect(tools.length).toBe(8);
  });

  test('Активные Инструменты - ERASER', () => {
    const { getAllByTestId } = renderWithProviders(
      <ToolbarTools tools={{ current: { type: ToolTypes.ERASER } } as unknown as ITools} />
    );

    const tools = getAllByTestId('tool-button');
    const activeIndex = getIndexActiveClass(tools);

    expect(activeIndex).toBe(7);
    expect(tools.length).toBe(8);
  });

  test('Активные эффекты - NONE', () => {
    const { getAllByTestId } = renderWithProviders(
      <ToolbarTools tools={{ current: null } as unknown as ITools} />,
      {
        preloadedState: {
          paint: {
            ...initialState,
            currentEffect: EffectTypes.NONE,
          },
        },
      }
    );

    const effects = getAllByTestId('button');
    const activeIndex = getIndexActiveClass(effects);

    expect(activeIndex).toBe(3);
    expect(effects.length).toBe(4);
  });

  test('Активные эффекты - RESIZE', () => {
    const { getAllByTestId } = renderWithProviders(
      <ToolbarTools tools={{ current: null } as unknown as ITools} />,
      {
        preloadedState: {
          paint: {
            ...initialState,
            currentEffect: EffectTypes.RESIZE,
          },
        },
      }
    );

    const effects = getAllByTestId('button');
    const activeIndex = getIndexActiveClass(effects);

    expect(activeIndex).toBe(0);
    expect(effects.length).toBe(4);
  });
});
