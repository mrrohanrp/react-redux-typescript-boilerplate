// import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { ADD_TODO, CLEAR_COMPLETED, COMPLETE_ALL, COMPLETE_TODO, DELETE_TODO, EDIT_TODO } from 'app/store/actionTypes';
import { TodoActions } from '../actions';
// import { TodoModel } from 'app/models';

const initialState: RootState.TodoState = [
  {
    id: 1,
    text: 'Use Redux',
    completed: false
  }
];

export default function todoReducer(
  state: RootState.TodoState = initialState,
  action: TodoActions
): RootState.TodoState {
  switch (action.type) {
    case ADD_TODO: {
      if (action.payload && action.payload.text) {
        return [
          {
            id: state.reduce((max, todo) => Math.max(todo.id || 1, max), 0) + 1,
            completed: false,
            text: action.payload.text
          },
          ...state
        ];
      }
      return state;
    }

    case DELETE_TODO: {
      return state.filter((todo) => todo.id !== action.payload.id);
    }

    case EDIT_TODO: {
      return state.map((todo) => {
        if (!todo || !action || !action.payload) {
          return todo;
        }
        return (todo.id || 0) === action.payload.id ? { ...todo, text: action.payload.text } : todo;
      });
    }

    case COMPLETE_TODO: {
      return state.map((todo) => (todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo));
    }

    case COMPLETE_ALL: {
      return state.map((todo) => ({ ...todo, completed: true }));
    }

    case CLEAR_COMPLETED: {
      return state.filter((todo) => todo.completed === false);
    }

    default:
      return state;
  }
}

/*
export const todoReducer = handleActions<RootState.TodoState, TodoModel>(
  {
    [TodoActions.Type.ADD_TODO]: (state, action) => {
      if (action.payload && action.payload.text) {
        return [
          {
            id: state.reduce((max, todo) => Math.max(todo.id || 1, max), 0) + 1,
            completed: false,
            text: action.payload.text
          },
          ...state
        ];
      }
      return state;
    },
    [TodoActions.Type.DELETE_TODO]: (state, action) => {
      return state.filter((todo) => todo.id !== (action.payload as any));
    },
    [TodoActions.Type.EDIT_TODO]: (state, action) => {
      return state.map((todo) => {
        if (!todo || !action || !action.payload) {
          return todo;
        }
        return (todo.id || 0) === action.payload.id ? { ...todo, text: action.payload.text } : todo;
      });
    },
    [TodoActions.Type.COMPLETE_TODO]: (state, action) => {
      return state.map((todo) =>
        todo.id === (action.payload as any) ? { ...todo, completed: !todo.completed } : todo
      );
    },
    [TodoActions.Type.COMPLETE_ALL]: (state, action) => {
      return state.map((todo) => ({ ...todo, completed: true }));
    },
    [TodoActions.Type.CLEAR_COMPLETED]: (state, action) => {
      return state.filter((todo) => todo.completed === false);
    }
  },
  initialState
); */
