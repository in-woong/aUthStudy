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
    <section>
      <label htmlFor='form'>{signUp ? 'Sign up' : 'Sign In'}</label>
      <form action='submit' id='form' onSubmit={onSubmit}>
        <input
          type='email'
          name='email'
          placeholder='email'
          value={email}
          onChange={onChange}
        />
        <input
          type='password'
          name='password'
          placeholder='password'
          value={password}
          onChange={onChange}
        />
        <input
          type='checkbox'
          name='signup'
          id='signup'
          onChange={onChange}
          checked={signUp}
        />
        <label htmlFor='signup'> Create a new account? </label>
        <button type='submit'>{signUp ? 'Sign up' : 'Sign In'}</button>
      </form>
    </section>
  );
};

export default Login;
