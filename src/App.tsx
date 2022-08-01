import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Nav from './components/Nav';
import TodolistView from './views/TodolistView';

import Login from './Login';
import me from './service/auth';
import { getTodos } from './service/todos';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { dateState } from './store/date';
import { getTodoState, todoState } from './store/todos';

function App() {
  const $hamburger = useRef<HTMLInputElement>(null);
  const [isLoggedin, setIsLoggedIn] = useState('');


  useEffect(() => {
    //웹 실행 시 최초 1회 해당 함수를 실행시켜 이전 로그인 기록이 있다면 불러옴
    me(setIsLoggedIn);
  }, []);


  return (
    <div className='App'>
      {!isLoggedin ? (
        <Login />
      ) : (
        <BrowserRouter>
          <input
            type='checkbox'
            id='side-menu'
            className='drawer-toggle'
            ref={$hamburger}
          ></input>
          <section className='drawer-content'>
            <Nav />
            <section className='main pt-16 mb-auto flex flex-col justify-center '>
              <Routes>
                <Route path='/' element={<TodolistView />} />
              </Routes>
            </section>
            <Footer />
          </section>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
