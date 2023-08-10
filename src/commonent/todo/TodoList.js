import axios from 'axios';
import { FaEdit, FaCheck } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { GrRevert } from 'react-icons/gr';
import '../../scss/TodoList.scss';
import React, { useCallback, useState } from 'react';

function TodoList({ todo, todoId, todoComp, setTodos }) {
  const [isEdit, setIsEdit] = useState(false);
  const [editTodo, setEditTodo] = useState(todo);
  const [editComp, setEditComp] = useState(todoComp);

  // 수정하기
  const todoEdit = useCallback(() => {
    axios
      .put(
        `https://www.pre-onboarding-selection-task.shop/todos/${todoId}`,
        {
          todo: editTodo,
          isCompleted: editComp,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        setEditTodo(response.data.todo);
        setIsEdit((isEdit) => !isEdit);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [editComp, editTodo, todoId]);
  // 수정취소
  const editCancel = useCallback(() => {
    setIsEdit((isEdit) => !isEdit);
    // 수정전값으로 바꾸기
    setEditTodo(todo);
  }, [todo]);

  // 삭제하기
  const RemoveTodo = useCallback(
    (id) => {
      axios
        .delete(
          `https://www.pre-onboarding-selection-task.shop/todos/${todoId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          setTodos((list) => list.filter((list) => list.id !== id));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [setTodos, todoId]
  );

  return (
    <ul className='todo_list'>
      <li className='todo' key={todoId}>
        <label>
          {isEdit ? (
            <>
              <input
                className='edit_input'
                type='text'
                data-testid='modify-input'
                onChange={(e) => setEditTodo(e.target.value)}
                value={editTodo}
                autoFocus
              />
              <div className='cancel_submit'>
                <button
                  className='cancel'
                  onClick={editCancel}
                  data-testid='cancel-button'
                >
                  <GrRevert />
                </button>
                <button
                  className='submit'
                  onClick={todoEdit}
                  data-testid='submit-button'
                >
                  <FaCheck />
                </button>
              </div>
            </>
          ) : (
            <>
              <input className='check' type='checkbox' />
              <span className='content'>{editTodo}</span>
              <div className='edit_delete'>
                <button
                  className='edit'
                  onClick={() => setIsEdit((isEdit) => !isEdit)}
                >
                  <FaEdit />
                </button>
                <button className='delete' onClick={() => RemoveTodo(todoId)}>
                  <MdDelete />
                </button>
              </div>
            </>
          )}
        </label>
      </li>
    </ul>
  );
}

export default React.memo(TodoList);
