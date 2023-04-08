import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { store } from '../store/store';
import { PaintPage } from '../pages/PaintPage';
import { generateId } from '../utils';

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/:id" element={<PaintPage />} />
          <Route path="*" element={<Navigate to={generateId()} replace />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};
