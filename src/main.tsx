import React from 'react';
import { createRoot } from 'react-dom/client';
import AppView from '@src/views/App.view';

console.log('[ERWT] : Renderer execution started');

const app = <AppView />;

createRoot(document.getElementById('app')).render(app);
