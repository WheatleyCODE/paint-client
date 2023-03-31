import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { store } from '../../store/store';
import { App } from '../App';
import { generateId } from '../../utils';

export const AppProvider = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/:id" element={<App />} />
          <Route path="*" element={<Navigate to={generateId()} replace />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};
