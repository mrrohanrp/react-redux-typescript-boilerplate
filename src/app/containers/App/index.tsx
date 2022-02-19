import React from 'react';
import style from './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { useTodoActions } from 'app/store/actions';
import { RootState } from 'app/store/reducers';
import { TodoModel } from 'app/models';
import { Header, TodoList, Footer } from 'app/components';
import { useNavigate } from 'react-router-dom';

const FILTER_VALUES = (Object.keys(TodoModel.Filter) as (keyof typeof TodoModel.Filter)[]).map(
  (key) => TodoModel.Filter[key]
);

const FILTER_FUNCTIONS: Record<TodoModel.Filter, (todo: TodoModel) => boolean> = {
  [TodoModel.Filter.SHOW_ALL]: () => true,
  [TodoModel.Filter.SHOW_ACTIVE]: (todo) => !todo.completed,
  [TodoModel.Filter.SHOW_COMPLETED]: (todo) => todo.completed
};

const App = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const todoActions = useTodoActions(dispatch);
  const { todos, filter } = useSelector((state: RootState) => {
    const hash = location?.hash?.replace('#', '');
    return {
      todos: state.todos,
      filter: FILTER_VALUES.find((value) => value === hash) ?? TodoModel.Filter.SHOW_ALL
    };
  });

  const handleClearCompleted = React.useCallback((): void => {
    todoActions.clearCompleted();
  }, [todoActions]);

  const handleFilterChange = React.useCallback(
    (filter: TodoModel.Filter): void => {
      navigate(`#${filter}`);
    },
    [navigate]
  );

  const filteredTodos = React.useMemo(() => (filter ? todos.filter(FILTER_FUNCTIONS[filter]) : todos), [todos, filter]);
  const activeCount = React.useMemo(() => todos.filter((todo) => !todo.completed).length, [todos]);
  const completedCount = React.useMemo(() => todos.filter((todo) => todo.completed).length, [todos]);

  return (
    <div className={style.normal}>
      <Header addTodo={todoActions.addTodo} />
      <TodoList todos={filteredTodos} actions={todoActions} />
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
