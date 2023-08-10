import React from 'react';
import SignIn from '../commonent/Auth/SignIn';
import SignUp from '../commonent/Auth/SignUp';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Todo from '../commonent/todo/Todo';
import '../scss/common.scss';

function Router() {
  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path='/' element={<Navigate replace to='signin' />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/todo' element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;
