import React from 'react';
import TodoInsert from './TodoInsert';
import '../../scss/Todo.scss';

function Todo() {
  return (
    <div className='todo_box'>
      <h1 className='todo_title'>T O D O L I S T</h1>
      <TodoInsert />
    </div>
  );
}

export default Todo;
