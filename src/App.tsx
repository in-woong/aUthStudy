import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Nav from './components/Nav';
import TodolistView from './views/TodolistView';

import Login from './Login';
import { authService } from './service/firebase';
import { AuthProvider } from './context/AuthContext';

function App() {
  const $hamburger = useRef<HTMLInputElement>(null);
  const [isLoggedin, setIsLoggedIn] = useState(false);

  useEffect(() => {
    //웹 실행 시 최초 1회 해당 함수를 실행시켜 이전 로그인 기록이 있다면 불러옴
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  return (
    <div className='App'>
      <BrowserRouter>
        <AuthProvider>
          <input
            type='checkbox'
            id='side-menu'
            className='drawer-toggle'
            ref={$hamburger}
          ></input>
          <section className='drawer-content'>
            <Nav />
            <section className='main pt-16 mb-auto'>
              <Routes>
                <Route path='/' element={<TodolistView />} />
              </Routes>
            </section>
            <Footer />
          </section>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
