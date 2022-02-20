import React from 'react';
import { RootState } from 'app/store/store';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { CLEARCOMPLETED } from 'app/store/todoSlice';
import style from './style.css';
import { Filter, TodoModel } from 'app/models';
import { Header, TodoList, Footer } from 'app/components';
import { useNavigate } from 'react-router-dom';

const FILTER_VALUES = (Object.keys(Filter) as (keyof typeof Filter)[]).map((key) => Filter[key]);

const FILTER_FUNCTIONS: Record<Filter, (todo: TodoModel) => boolean> = {
  [Filter.SHOW_ALL]: () => true,
  [Filter.SHOW_ACTIVE]: (todo) => !todo.completed,
  [Filter.SHOW_COMPLETED]: (todo) => todo.completed
};

const App = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { todos, filter } = useAppSelector((state: RootState) => {
    const hash = location?.hash?.replace('#', '');
    return {
      todos: state.todos,
      filter: FILTER_VALUES.find((value) => value === hash) ?? Filter.SHOW_ALL
    };
  });

  const handleClearCompleted = React.useCallback((): void => {
    dispatch(CLEARCOMPLETED());
  }, [dispatch]);

  const handleFilterChange = React.useCallback(
    (filter: Filter): void => {
      navigate(`#${filter}`);
    },
    [navigate]
  );

  const filteredTodos = React.useMemo(() => (filter ? todos.filter(FILTER_FUNCTIONS[filter]) : todos), [todos, filter]);
  const activeCount = React.useMemo(() => todos.filter((todo: TodoModel) => !todo.completed).length, [todos]);
  const completedCount = React.useMemo(() => todos.filter((todo: TodoModel) => todo.completed).length, [todos]);

  return (
    <div className={style.normal}>
      <Header />
      <TodoList todos={filteredTodos} />
      <Footer
        filter={filter}
        activeCount={activeCount}
        completedCount={completedCount}
        onClickClearCompleted={handleClearCompleted}
        onClickFilter={handleFilterChange}
      />
    </div>
  );
};

export default App;
