import { authService } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { SetStateAction } from 'react';

type email = string;
type password = string;

export const signUp = async (email: email, password: password) => {
  console.log('signup', email, password);
  await createUserWithEmailAndPassword(authService, email, password)
    .then((userCredential) => {
      //signed in
      const user = userCredential.user;
      console.log('signup result', user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export const signIn = async (email: email, password: password) => {
  console.log('signin', email, password);
  await signInWithEmailAndPassword(authService, email, password)
    .then((userCredential) => {
      //Sign in
      const user = userCredential.user;
      console.log('signin result', user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export const logOut = async () => {
  alert('로그아웃 되었습니다.');
  await signOut(authService)
    .then(() => {
      //Sign-out successful
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

const me = (setIsLoggedIn: React.Dispatch<SetStateAction<string>>) => {
  onAuthStateChanged(authService, (user) => {
    if (user) {
      setIsLoggedIn(user.uid);
    } else {
      setIsLoggedIn('');
    }
  });
};

export default me;
