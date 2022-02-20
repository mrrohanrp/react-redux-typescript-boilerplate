import React from 'react';
import { useAppDispatch } from 'src/store/hooks';
import { COMPLETEALL } from 'src/store/todoSlice';
import { TodoItem } from '../TodoItem';
import { TodoModel } from 'src/models/TodoModel';
import style from './style.module.scss';

export interface IProps {
  todos: TodoModel[];
}

export const TodoList = ({ todos }: IProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const hasIncompleted = React.useMemo(() => todos.some((todo) => !todo.completed), [todos]);
  return (
    <section className={style.main}>
      {hasIncompleted && (
        <input
          className={style.toggleAll}
          type="checkbox"
          checked={hasIncompleted}
          onChange={() => dispatch(COMPLETEALL())}
        />
      )}
      <ul className={style.normal}>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </section>
  );
};
