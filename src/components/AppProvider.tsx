import React, { useEffect, useMemo, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { store } from '../store/store';
import { App } from './App';
import { IPaintContext, PaintContext } from './PaintContext';
import { generateId } from '../utils/id.utils';

export const AppProvider = () => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement>();

  useEffect(() => {
    const $canvas = document.querySelector('#canvas') as HTMLCanvasElement;
    setCanvas($canvas);
  }, []);

  const data: IPaintContext = useMemo(
    () => ({
      canvas,
    }),
    [canvas]
  );

  return (
    <BrowserRouter>
      <PaintContext.Provider value={data}>
        <Provider store={store}>
          <Routes>
            <Route path="/:id" element={<App />} />
            <Route path="*" element={<Navigate to={generateId()} replace />} />
          </Routes>
        </Provider>
      </PaintContext.Provider>
    </BrowserRouter>
  );
};
