import React from 'react';
import { useAppDispatch } from 'app/store/hooks';
import { ADDTODO } from 'app/store/todoSlice';
import { TodoTextInput } from '../TodoTextInput';

export const Header = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleSave = React.useCallback(
    (text: string) => {
      if (text.length) dispatch(ADDTODO({ text: text }));
    },
    [dispatch]
  );

  return (
    <header>
      <h1>Todos</h1>
      <TodoTextInput newTodo onSave={handleSave} placeholder="What needs to be done?" />
    </header>
  );
};
