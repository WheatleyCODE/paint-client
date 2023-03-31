import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProvider } from './components/hoc/AppProvider';
import './styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(<AppProvider />);
