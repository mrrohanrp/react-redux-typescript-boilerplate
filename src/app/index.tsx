import React from 'react';
import { Route, Routes } from 'react-router';
import { App as TodoApp } from 'app/containers/App';
import { hot } from 'react-hot-loader';

export const App = hot(module)(() => (
  <Routes>
    <Route path="/" element={TodoApp} />
  </Routes>
));
