import axios from 'axios';

const test = async () => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  const response = await axios.get('http://localhost:5000/api/test/hello', config);
  return response;
};

export default test;
