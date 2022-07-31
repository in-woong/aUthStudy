import React, { useState } from 'react';
import * as AuthService from './service/auth';

const Login = () => {
  const [signUp, setSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (signUp) {
      AuthService.signUp(email, password);
    } else {
      AuthService.signIn(email, password);
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
    <section className='w-[50%] h-96 min-w-fit min-h-fit p-10 py-12 mt-48 mx-auto flex flex-col justify-center content-center bg-lime-200 rounded-3xl drop-shadow-xl'>
      <label htmlFor='form' className='mb-10 mx-auto'>
        <img src='./mainTheme.png' className='w-32'></img>
      </label>
      <form
        action='submit'
        id='form'
        onSubmit={onSubmit}
        className='flex flex-col justify-center'
      >
        <div className='mb-8 text-xl'>
          <label htmlFor='email'>Email : </label>
          <input
            type='email'
            name='email'
            placeholder='email'
            value={email}
            onChange={onChange}
            className='bg-transparent w-1/2'
          />
        </div>
        <div className='mb-10 text-xl'>
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

        <button
          type='submit'
          className='font-bold text-gray-600 text-lg hover:text-blackF'
        >
          {signUp ? 'Sign up' : 'Sign In'}
        </button>
      </form>
    </section>
  );
};

export default Login;
