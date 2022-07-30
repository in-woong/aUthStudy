import React, { useState } from 'react';
import * as AuthService from './service/auth';

const Login = ({ onSignUp, onLogin }) => {
  const [signUp, setSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (signUp) {
      onSignUp(email, password);
    } else {
      onLogin(email, password);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'signup':
        setSignup(checked);
        break;
    }
    if (name == 'signup') {
      setSignup(checked);
    }
  };
  return (
    <section className='w-[50%] h-[30%] p-10 mx-auto my-auto flex flex-col justify-center content-center relative bg-lime-200 rounded-3xl'>
      <label htmlFor='form absolute '>
        <img src='./mainTheme.png' className='w-20'></img>
      </label>
      <form
        action='submit'
        id='form'
        onSubmit={onSubmit}
        className='flex flex-col justify-center'
      >
        <div>
          <label htmlFor='email'>Email : </label>
          <input
            type='email'
            name='email'
            placeholder='email'
            value={email}
            onChange={onChange}
            className='bg-transparent'
          />
        </div>
        <div>
          <label htmlFor='password'>Password : </label>
          <input
            type='password'
            name='password'
            placeholder='password'
            value={password}
            onChange={onChange}
            className='bg-transparent'
          />
        </div>

        <div>
          <input
            type='checkbox'
            name='signup'
            id='signup'
            onChange={onChange}
            checked={signUp}
          />
          <label htmlFor='signup'> Create a new account? </label>
        </div>

        <button type='submit'>{signUp ? 'Sign up' : 'Sign In'}</button>
      </form>
    </section>
  );
};

export default Login;
