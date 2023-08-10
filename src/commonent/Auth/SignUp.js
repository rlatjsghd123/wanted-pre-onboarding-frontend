import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../scss/SignUp.scss';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [isEmail, setIsEmail] = useState('');
  const [isPassword, setIsPassword] = useState('');
  const navigate = useNavigate();
  const handleClickSignUp = (e) => {
    e.preventDefault();
    axios
      .post(
        'https://www.pre-onboarding-selection-task.shop/auth/signup',
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
        if (response.status === 201) {
          alert('회원가입 성공!');
          navigate('/signin');
        }
      })
      .catch((error) => {
        if (
          error.response.data.message === '동일한 이메일이 이미 존재합니다.'
        ) {
          setErrorMsg('동일한 이메일이 이미 존재합니다.');
        }
      });
  };

  const onBlurEmail = (e) => {
    const exp = /@/;
    const emailValue = e.target.value;
    if (!exp.test(emailValue)) {
      setIsEmail('이메일 형식이여야 합니다.');
      setIsDisabled(true);
    } else {
      setIsEmail('');
      setIsDisabled(false);
    }
  };
  const onBlurPwd = (e) => {
    const pwdLength = e.target.value.length;
    if (pwdLength <= 8) {
      setIsPassword('비밀번호는 8자 이상이여야 합니다.');
      setIsDisabled(true);
    } else {
      setIsPassword('');
      setIsDisabled(false);
    }
    if (isEmail === '이메일 형식이여야 합니다.') {
      setIsDisabled(true);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    console.log(token);
    if (token) {
      navigate('/todo');
    }
  }, []);

  return (
    <div className='signup'>
      <form className='signup_form' onSubmit={handleClickSignUp}>
        <div>
          <h1 className='title'>회원가입</h1>
          <input
            type='text'
            data-testid='email-input'
            onChange={(e) => setEmail(e.target.value)}
            onBlur={onBlurEmail}
            value={email}
            placeholder='Email을 입력해주세요'
            required
          />
          <div className='test'>
            {isEmail}
            {errorMsg}
          </div>
        </div>
        <div>
          <input
            type='password'
            data-testid='password-input'
            onChange={(e) => setPassword(e.target.value)}
            onBlur={onBlurPwd}
            value={password}
            placeholder='비밀번호를 입력해주세요'
            required
          />
          <div className='test'>{isPassword}</div>
        </div>
        <button disabled={isDisabled} type='submit' data-testid='signup-button'>
          회원가입
        </button>
      </form>
    </div>
  );
}

export default SignUp;
