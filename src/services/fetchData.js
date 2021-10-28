const fetchData = async (url, headers = {}) => {
  return fetch(`${process.env.REACT_APP_PROXY}${url}`, {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      ...headers
    }
  });
};

export default fetchData;