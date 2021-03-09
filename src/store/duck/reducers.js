import types from './types.js';

const todo = (state, action) => {
    switch (action.type) {
        case types.GET_TODOS_SUCCESS:
            return {
                id: action.id,
                userId: action.userId,
                title: action.title,
                completed: action.completed
            };
        
        case types.PATCH_TODO_COMPLETED_SUCCESS:
            return {
                ...action.payload,
                completed: !action.payload.completed
            };
        
        case types.POST_TODO_SUCCESS:
            return action.payload

        default:
            return state;

    };

};


const todos = (state = [], action) => {

    switch (action.type) {
        case types.GET_TODOS_SUCCESS:
            return action.payload.map(x => todo(undefined, {type: action.type, ...x}));
        
        case types.PATCH_TODO_COMPLETED_SUCCESS:
            return state.map(x => {
                if (x.id === action.payload.id) {
                    return todo(x, action);

                } else {
                    return x;

                };
            });
        
        case types.DELETE_TODO_SUCCESS:
            return state.filter(x => x.id !== action.payload.id);
        
        case types.POST_TODO_SUCCESS:
            return [ ...state, todo(undefined, action)];

        default:
            return state;

    };

};

const filter = (state = 'ALL', action) => {
    switch (action.type) {
        case types.SHOW_ALL:
            return action.filter;
        
        case types.SHOW_TODO:
            return action.filter;

        case types.SHOW_DONE:
            return action.filter;
            
        default:
            return state;

    };

};

const todosReducer = {todos, filter};

export default todosReducer;