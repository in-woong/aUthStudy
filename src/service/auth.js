const AuthService = (http) => {
  const test = () => {
    console.log('fuck');
  };

  const signUp = async (email, password, firstName, lastName) => {
    const data = await fetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
      }),
    });

    return data;
  };

  const login = async (email, password) => {
    const data = await fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    });
    return data;
  };
};

export default AuthService;
