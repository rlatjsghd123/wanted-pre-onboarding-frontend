import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import TodoList from './TodoList';
import { BsPlus } from 'react-icons/bs';
import '../../scss/TodoInsert.scss';

function TodoInsert() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);

  // todo만들기
  const createTodo = useCallback(() => {
    axios
      .post(
        'https://www.pre-onboarding-selection-task.shop/todos',
        {
          todo: text,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        const list = todos.concat(response.data);

        setTodos(list);
        getTodo();
      })
      .catch((error) => {
        console.log(error);
      });
  }, [text, todos]);

  // todo 가져오기
  const getTodo = useCallback(() => {
    axios
      .get('https://www.pre-onboarding-selection-task.shop/todos', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      })
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // todo 추가
  const handleSubmitAdd = useCallback(
    (e) => {
      e.preventDefault();
      createTodo();
      setText('');
    },
    [createTodo]
  );

  useEffect(() => {
    getTodo();
  }, [getTodo]);

  return (
    <>
      <form className='todo_form' onSubmit={handleSubmitAdd}>
        <input
          className='todo_input'
          type='text'
          data-testid='new-todo-input'
          placeholder='오늘의 할 일은?'
          onChange={useCallback((e) => setText(e.target.value), [])}
          value={text}
        />
        <button
          className='add_button'
          data-testid='new-todo-add-button'
          type='submit'
        >
          <BsPlus />
        </button>
      </form>
      {todos.map((list) => (
        <TodoList
          setTodos={setTodos}
          todo={list.todo}
          todoId={list.id}
          todoComp={list.isCompleted}
          key={list.id}
        />
      ))}
    </>
  );
}

export default TodoInsert;
