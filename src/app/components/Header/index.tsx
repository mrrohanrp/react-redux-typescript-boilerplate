import React from 'react';
import { TodoTextInput } from '../TodoTextInput';
import { TodoActions } from 'app/store/actionTypes';

export interface IProps {
  addTodo: typeof TodoActions.addTodo;
}

export const Header = ({ addTodo }: IProps): JSX.Element => {
  const handleSave = React.useCallback(
    (text: string) => {
      if (text.length) addTodo({ text });
    },
    [addTodo]
  );

  return (
    <header>
      <h1>Todos</h1>
      <TodoTextInput newTodo onSave={handleSave} placeholder="What needs to be done?" />
    </header>
  );
};
