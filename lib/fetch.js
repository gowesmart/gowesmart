const fetchInstance = (path, options = {}) => {
  return fetch(process.env.NEXT_PUBLIC_HOST + path, {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
    },
  });
};

export default fetchInstance;
