import connect from '../utils/api-client';

const headers = {
  'User-Agent': global.navigator.userAgent,
  Accept: 'application/vnd.github.v3+json',
};

const api = connect('https://api.github.com', headers);

export default api;
