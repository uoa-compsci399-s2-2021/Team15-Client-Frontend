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

async function saveJob(info) {
  const response = await axios(
    'https://cs399-team15.herokuapp.com/api/private/user-save-job',
    {
      headers: {
        'Content-type': 'application/json',
      },
      data: info,
      method: 'POST',
    },
  );
  return response;
}

export default {test, saveJob};
