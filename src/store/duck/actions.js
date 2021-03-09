import types from './types.js';
import { createAction } from 'redux-api-middleware';


const getTodos = () => createAction({
    endpoint: 'https://jsonplaceholder.typicode.com/todos',
    method: 'GET',
    types: [
        types.GET_TODOS_REQUEST,
        types.GET_TODOS_SUCCESS,
        types.GET_TODOS_FAILURE
    ]
});

const patchCompleted = (id, completed) => createAction({
    endpoint: `https://jsonplaceholder.typicode.com/todos/${id}`,
    method: 'PATCH',
    body: JSON.stringify({completed}),
    types: [
        types.PATCH_TODO_COMPLETED_REQUEST,
        types.PATCH_TODO_COMPLETED_SUCCESS,
        types.PATCH_TODO_COMPLETED_FAILURE
    ]
});

const deleteTodo = (id) => createAction({
    endpoint: `https://jsonplaceholder.typicode.com/todos/${id}`,
    method: 'DELETE',
    types: [
        types.DELETE_TODO_REQUEST,
        {
            type: types.DELETE_TODO_SUCCESS,
            payload:{id}
        },
        types.DELETE_TODO_FAILURE
    ]
});

const postTodo = (id, userId, title, completed) => createAction({
    endpoint: 'https://jsonplaceholder.typicode.com/todos',
    method: 'POST',
    body: JSON.stringify({
        userId,
        title,
        completed
    }),
    types: [
        types.POST_TODO_REQUEST,
        {
            type: types.POST_TODO_SUCCESS,
            payload: {
                id,
                userId,
                title,
                completed
            }
        },
        types.POST_TODO_FAILURE 
    ]
});

const showAll = () => (
    {
        type: types.SHOW_ALL,
        filter: 'ALL'
    }
);

const showTodo = () => (
    {
        type: types.SHOW_TODO,
        filter: 'TODO'
    }
);

const showDone = () => (
    {
        type: types.SHOW_DONE,
        filter: 'DONE'
    }
);

const actions = {getTodos, patchCompleted, deleteTodo, postTodo, showAll, showTodo, showDone};

export default actions;