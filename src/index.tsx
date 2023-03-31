import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { App } from './components/App';
import { store } from './store/store';
import { generateId } from './utils/id.utils';
import './styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/:id" element={<App />} />
        <Route path="*" element={<Navigate to={generateId()} replace />} />
      </Routes>
    </Provider>
  </BrowserRouter>
);
