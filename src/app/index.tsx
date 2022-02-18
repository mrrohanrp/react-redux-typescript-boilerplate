import React from 'react';
import { Route, Routes } from 'react-router';
import TodoApp from 'app/containers/App';

export const App = () => (
  <Routes>
    <Route path="/" element={<TodoApp />} />
  </Routes>
);
