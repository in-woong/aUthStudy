import { useUserState } from '../context/UserContext';

const MyPage = () => {
  const { user } = useUserState();
  return <h1>myPage</h1>;
};

export default MyPage;
