import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Nav from './components/Nav';

import TodolistView from './views/TodolistView';

function App() {
  const $hamburger = useRef<HTMLInputElement>(null);

  return (
    <div className='App'>
      <BrowserRouter>
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
      </BrowserRouter>
    </div>
  );
}

export default App;
