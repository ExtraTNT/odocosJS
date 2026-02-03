/**
 * Convert a plain object to a URL query string.
 *
 * Keys and values are concatenated as {@code key=value} pairs joined by {@code &},
 * and the whole string is prefixed with {@code ?}. Values are not URL-encoded.
 *
 * @param {Object<string, (string|number|boolean)>} x - Object to convert to query string.
 * @returns {string} Query string starting with {@code ?}.
 * @example
 *   mapToQuery({ a: 1, b: 2 }) // '?a=1&b=2'
 * @haskell mapToQuery :: {String : a} -> String
 */
const mapToQuery = x =>
  Object.keys(x)
    .reduce((acc, c) => `${acc}${c}=${x[c]}&`, '?')
    .slice(0, -1);

const headers = {
  'Content-Type': 'application/json',
};

const getList = endpoint => async (options = {}) => {
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

/**
 * Create a GET helper for a fixed endpoint.
 *
 * Returns an async function that accepts an {@code options} object which is
 * converted into a query string via {@link mapToQuery}, then performs a JSON
 * fetch and returns the parsed body.
 *
 * @param {string} endpoint - Base URL without query string.
 * @returns {function(Object=): Promise<any>} Function performing the GET request.
 * @throws {Error} If the HTTP response is not ok.
 * @example
 *   const getUser = get('/api/user');
 *   const user = await getUser({ id: 1 });
 * @haskell get :: String -> {String : a} -> IO b
 */
const get = endpoint => async (options = {}) => {
  const response = await fetch(`${endpoint}${mapToQuery(options)}`, {
    method: 'GET',
    headers: headers,
  });
  if (response.ok) return response.json();
  throw new Error([response.status, response.statusText].join('\n'));
};

/**
 * Create a POST helper for a fixed endpoint.
 *
 * Returns a curried function taking a JSON-serialisable {@code payload} and
 * an {@code options} object for query parameters, then performing the request
 * and returning the parsed JSON response.
 *
 * @param {string} endpoint - Base URL without query string.
 * @returns {function(Object=): function(Object=): Promise<any>} Curried POST helper.
 * @throws {Error} If the HTTP response is not ok.
 * @example
 *   const createUser = post('/api/user');
 *   const result = await createUser({ name: 'Ada' })({});
 * @haskell post :: String -> a -> {String : b} -> IO c
 */
const post = endpoint => (payload = {}) => async (options = {}) => {
  const response = await fetch(`${endpoint}${mapToQuery(options)}`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: headers,
  });
  if (response.ok) return response.json();
  throw new Error([response.status, response.statusText].join('\n'));
};

/**
 * Create a PUT helper for a fixed endpoint.
 *
 * Same calling convention as {@link post}, but sends an HTTP PUT request.
 *
 * @param {string} endpoint - Base URL without query string.
 * @returns {function(Object=): function(Object=): Promise<any>} Curried PUT helper.
 * @throws {Error} If the HTTP response is not ok.
 * @example
 *   const updateUser = put('/api/user/1');
 *   const result = await updateUser({ name: 'Ada' })({});
 * @haskell put :: String -> a -> {String : b} -> IO c
 */
const put = endpoint => (payload = {}) => async (options = {}) => {
  const response = await fetch(`${endpoint}${mapToQuery(options)}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: headers,
  });
  if (response.ok) return response.json();
  throw new Error([response.status, response.statusText].join('\n'));
};

/**
 * Create a PATCH helper for a fixed endpoint.
 *
 * Same calling convention as {@link post}, but sends an HTTP PATCH request.
 *
 * @param {string} endpoint - Base URL without query string.
 * @returns {function(Object=): function(Object=): Promise<any>} Curried PATCH helper.
 * @throws {Error} If the HTTP response is not ok.
 * @example
 *   const patchUser = patch('/api/user/1');
 *   const result = await patchUser({ name: 'Ada' })({});
 * @haskell patch :: String -> a -> {String : b} -> IO c
 */
const patch = endpoint => (payload = {}) => async (options = {}) => {
  const response = await fetch(`${endpoint}${mapToQuery(options)}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
    headers: headers,
  });
  if (response.ok) return response.json();
  throw new Error([response.status, response.statusText].join('\n'));
};

/**
 * Create a DELETE helper for a fixed endpoint.
 *
 * Same calling convention as {@link post}, but sends an HTTP DELETE request.
 * Some APIs ignore the body for DELETE; this helper always JSON-stringifies
 * the given {@code payload}.
 *
 * @param {string} endpoint - Base URL without query string.
 * @returns {function(Object=): function(Object=): Promise<any>} Curried DELETE helper.
 * @throws {Error} If the HTTP response is not ok.
 * @example
 *   const deleteUser = remove('/api/user/1');
 *   const result = await deleteUser({})( {} );
 * @haskell remove :: String -> a -> {String : b} -> IO c
 */
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