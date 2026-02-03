
/**
 *  Converts an object to a query string.
 * @param {Object} x * Object to convert to query string.
 * @returns {string} query string starting with ?
 * @example mapToQuery({ a: 1, b: 2 }) // '?a=1&b=2'
 */
const mapToQuery = x =>
  Object.keys(x)
    .reduce((acc, c) => `${acc}${c}=${x[c]}&`, '?')
    .slice(0, -1);

const headers = {
  'Content-Type': 'application/json',
};

const getList = async (endpoint, options = {}) => {
  const response = await fetch(`${endpoint}${mapToQuery(options)}`, {
    method: 'GET',
    headers: headers,
  });
  if (response.ok)
    return [
      await response.json(),
      parseInt(response.headers.get('x-total-count') || '', 10),
    ];
  throw new Error([response.status, response.statusText].join('\n'));
};

const get = endpoint => async (options = {}) => {
  const response = await fetch(`${endpoint}${mapToQuery(options)}`, {
    method: 'GET',
    headers: headers,
  });
  if (response.ok) return response.json();
  throw new Error([response.status, response.statusText].join('\n'));
};

const post = endpoint => (payload = {}) => async (options = {}) => {
  const response = await fetch(`${endpoint}${mapToQuery(options)}`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: headers,
  });
  if (response.ok) return response.json();
  throw new Error([response.status, response.statusText].join('\n'));
};

const put = endpoint => (payload = {}) => async (options = {}) => {
  const response = await fetch(`${endpoint}${mapToQuery(options)}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: headers,
  });
  if (response.ok) return response.json();
  throw new Error([response.status, response.statusText].join('\n'));
};

const patch = endpoint => (payload = {}) => async (options = {}) => {
  const response = await fetch(`${endpoint}${mapToQuery(options)}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
    headers: headers,
  });
  if (response.ok) return response.json();
  throw new Error([response.status, response.statusText].join('\n'));
};

const remove = endpoint => (payload = {}) => async (options = {}) => {
  const response = await fetch(`${endpoint}${mapToQuery(options)}`, {
    method: 'DELETE',
    body: JSON.stringify(payload),
    headers: headers,
  });
  if (response.ok) return response.json();
  throw new Error([response.status, response.statusText].join('\n'));
};


export { mapToQuery, getList, get, post, put, patch, remove };