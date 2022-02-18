import React from 'react';
import { Route, Routes } from 'react-router';
import { App as TodoApp } from 'app/containers/App';

export const App = () => (
  <Routes>
    <Route path="/" element={<TodoApp />} />
  </Routes>
);
