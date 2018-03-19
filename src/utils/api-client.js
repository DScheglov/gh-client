import QS from 'query-string';
import { compose } from './funcs';


const buildQuery = query => (
  query ? `?${QS.stringify(query)}` : ''
);

const buildUrl = (baseUrl, url, query) => (
  `${baseUrl}${url}${buildQuery(query)}`
);

const checkResult = res => (
  res.status >= 200 && res.status < 300
    ? res
    : Promise.reject(new Error(res.status))
);

const get = conn => (url, query) =>
  fetch(buildUrl(conn.baseUrl, url, query), { headers: conn.headers })
    .then(checkResult)
    .then(res => res.json());

const connection = (baseUrl, headers) => ({
  baseUrl,
  headers,
});

const connInterface = conn => ({
  get: get(conn),
});

const connect = compose(connInterface, connection);

export default connect;
