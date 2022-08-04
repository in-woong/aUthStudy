import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Nav from './components/Nav';
import TodolistView from './views/TodolistView';

import Login from './Login';
import me from './service/auth';
import { RecoilRoot } from 'recoil';
import { todoState, Todo } from './store/todos';
import { getTodos } from './service/todos';

function App() {
  const $hamburger = useRef<HTMLInputElement>(null);
  const [isLoggedin, setIsLoggedIn] = useState('');
  const [value, setValue] = useState<Todo[]>([]);

  useEffect(() => {
    //웹 실행 시 최초 1회 해당 함수를 실행시켜 이전 로그인 기록이 있다면 불러옴
    me(setIsLoggedIn);
    getTodos(new Date()).then((v) => setValue(v as Todo[]));
    console.log('value', value);
  }, []);

  const initialValue = getTodos(new Date());
  return (
    <div className='App'>
      {!isLoggedin ? (
        <Login />
      ) : (
        <BrowserRouter>
          <RecoilRoot initializeState={() => Object.assign(todoState, value)}>
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
          </RecoilRoot>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
