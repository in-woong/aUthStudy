import {
  createContext,
  createRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import Login from '../Login';
import * as AuthService from '../service/auth';

const AuthContext = createContext({});
const contextRef = createRef();

export function AuthProvider({children}) {
  const [user, setUser] = useState(undefined);

  useImperativeHandle(contextRef, () => (user ? user?.token : undefined));

  //   useEffect(() => {
  //     authErrorBus.listen((err) => {
  //       console.log(err);
  //       setUser(undefined);
  //     });
  //   }, [authErrorBus]);
  
  const signUp = useCallback(
    async (email: string, password: string) =>
      AuthService.signUp(email, password).then((user) => setUser(user)),
    [AuthService]
  );

  const logIn = useCallback(
    async (email: string, password: string) =>
      AuthService.signIn(email, password).then((user) => setUser(user)),
    [AuthService]
  );

  const logOut = useCallback(
    async () => AuthService.logOut().then(() => setUser(undefined)),
    [AuthService]
  );

  const context = useMemo(
    () => ({
      user,
      signUp,
      logIn,
      logOut,
    }),
    [user, signUp, logIn, logOut]
  );

  return <AuthContext.Provider value={context}>
    {user?(children):(
        <div>
            <Login onSignUp={signUp} onLogin={logIn}/>
        </div>
    )}
  </AuthContext.Provider>;
}

export default AuthContext;
export const fetchToken= ()=> contextRef.current;
export const useAuth =()=> useContext(AuthContext);
