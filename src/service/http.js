const HttpClient = (baseURL, authErrorEventBus) => {
  const fetch = async (url, options) => {
    const res = await fetch(`${baseURL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    let data;
    try {
      data = await res.json();
    } catch (error) {
      alert(error);
    }

    if (res.status > 299 || res.status < 200) {
      const message =
        data && data.message ? data.message : 'Something went wrong';
      const error = new Error(message);

      if (res.status == 401) {
        authErrorEventBus.notify(error);
        alert(error);
        return {};
      }
    }
    return data;
  };
};

export default HttpClient;
