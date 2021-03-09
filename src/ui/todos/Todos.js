import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';

import actions from '../../store/duck/actions.js';

const Todos = ({todos, onGetTodos, onPatchTodoCompleted, ondDeleteTodo, onPostTodo, filter, onShowAll, onShowTodo, onShowDone}) => {
    const [input, setInput] = useState('');
    const [input2, setInput2] = useState('');

    useEffect(() => {onGetTodos()}, [])

    return (
        <div>
            userId:<input value={input} onChange={y => setInput(y.target.value)}/>
            title:<input value={input2} onChange={y => setInput2(y.target.value)}/>
            <button onClick={() => {onPostTodo(todos.length + 1, input, input2, false); setInput(''); setInput2('')}}>ADD NEW TODO</button>
            <button onClick={() => onShowAll()}>ALL</button>
            <button onClick={() => onShowDone()}>DONE</button>
            <button onClick={() => onShowTodo()}>TODO</button>
            <table>
                <thead>
                    <tr>
                        <th>userId</th>
                        <th>title</th>
                        <th>completed</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {todos.filter(x => {
                        switch (filter) {
                            case 'ALL':
                                return true;

                            case 'TODO':
                                return x.completed === false;

                            case 'DONE':
                                return x.completed === true;

                            default:
                                return false
                        }
                    }).map(x => {
                        return (
                            <tr key={x.id}>
                                <th>{x.userId}</th>
                                <th>{x.title}</th>
                                <th><input type='checkbox' checked={x.completed} onChange={() => onPatchTodoCompleted(x.id, !x.completed)}/></th>
                                <th><button onClick={() => ondDeleteTodo(x.id)}>DELETE</button></th>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            
        </div>
    );

};

const mapStateToProps = (state) => {
    return {
        todos: state.todos,
        filter: state.filter
    };

};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetTodos: () => {
            dispatch(actions.getTodos());

        },
        onPatchTodoCompleted: (id, completed) => {
            dispatch(actions.patchCompleted(id, completed));

        },
        ondDeleteTodo: (id) => {
            dispatch(actions.deleteTodo(id));

        },
        onPostTodo: (id, userId, title, completed) => {
            dispatch(actions.postTodo(id, userId, title, completed));
        },
        onShowAll: () => {dispatch(actions.showAll())},
        onShowTodo: () => {dispatch(actions.showTodo())},
        onShowDone: () => {dispatch(actions.showDone())}
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);