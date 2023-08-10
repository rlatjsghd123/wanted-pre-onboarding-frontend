import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../scss/Signin.scss';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleClickLogin = (e) => {
    e.preventDefault();
    axios
      .post(
        'https://www.pre-onboarding-selection-task.shop/auth/signin',
        {
          email,
          password,
        },

        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          alert('로그인 성공!');
          navigate('/todo');
          localStorage.setItem('jwtToken', response.data.access_token);
        }
      })
      .catch((error) => {
        setErrorMsg(error.response.data.message);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    console.log(token);
    if (token) {
      navigate('/todo');
    }
  }, []);

  return (
    <div className='signin'>
      <form className='signin_form' onSubmit={handleClickLogin}>
        <div>
          <h1 className='title'>로그인</h1>
          <input
            type='text'
            data-testid='email-input'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder='Email을 입력해주세요'
            required
          />
          <div className='test'>{errorMsg}</div>
        </div>
        <div>
          <input
            type='password'
            data-testid='password-input'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder='비밀번호를 입력해주세요'
            required
          />
        </div>
        <div className='signup_link'>
          <Link to='/signup'>회원가입</Link>
        </div>
        <button type='submit' data-testid='signin-button'>
          로그인
        </button>
      </form>
    </div>
  );
}

export default SignIn;
