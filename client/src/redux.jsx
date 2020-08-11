import { createStore } from 'redux';

const initialState = {
  todos: []
};

export const store = createStore(
  reducer,
  initialState,
  window.devToolsExtension && window.devToolsExtension()
);

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case 'SET_TODO':
      return {
        ...state,
        todos: action.data
      };

    case 'SORT_TODO':
      let res;
      switch (action.param) {
        case "date":
          res = action.data.sort((a, b) => new Date(a[action.param]).getTime() - new Date(b[action.param]).getTime());
        case "text":
        case "type":
          res = action.data.sort((a, b) => a[action.param].localeCompare(b[action.param]));
        case "sortby":
        default:
          res = action.data
      }
      return {
        ...state,
        todos: res
      };
    case 'EDITMODE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, editMode: !todo.editMode } : todo
        )
      };
    case 'EDIT_TODO_DATE':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, date: action.data } : todo
        )
      };
    case 'EDIT_TODO_TEXT':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, text: action.data } : todo
        )
      };
    case 'EDIT_TODO_TYPE':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, type: action.data } : todo
        )
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, complete: !todo.complete } : todo
        )
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload)
      };
    default:
      return state;
  }
}

export const setTodoAction = (data) => ({
  type: 'SET_TODO', data
});

export const sortTodoAction = (data, param) => ({
  type: 'SORT_TODO', data, param
});

export const addTodoAction = (todo) => ({
  type: 'ADD_TODO',
  payload: todo
});

export const toggleTodoComplete = (todoId) => ({
  type: 'TOGGLE_TODO',
  payload: todoId
});

export const todoEditMode = (todoId) => ({
  type: 'EDITMODE_TODO',
  payload: todoId
});

export const editTodoDate = (todoId, param, data) => ({
  type: 'EDIT_TODO_DATE',
  payload: todoId, param, data
});

export const editTodoText = (todoId, param, data) => ({
  type: 'EDIT_TODO_TEXT',
  payload: todoId, param, data
});

export const editTodoType = (todoId, param, data) => ({
  type: 'EDIT_TODO_TYPE',
  payload: todoId, param, data
});

export const deleteTodoAction = (todoId) => ({
  type: 'DELETE_TODO',
  payload: todoId
});
