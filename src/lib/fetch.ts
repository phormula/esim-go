const BASE_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

function getAuthorization() {
  return API_KEY ? { 'X-API-Key': API_KEY } : {};
}

async function raiseHTTPException(f: any, ...params: any) {
  // console.log(`handleError ${f.name} ( ${params.map((p) => JSON.stringify(p)).join(', ')} )`);
  const resp = await f(...params);
  const body = await resp.json();

  if (!resp.ok) {
    throw { status: resp.status, statusText: resp.statusText, message: body.message };
  }

  return body;
}

function objectToQueryParams(obj: { [key: string]: any }) {
  const params = new URLSearchParams();

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (Array.isArray(value)) {
        value.forEach((item) => params.append(key, item));
      } else {
        params.set(key, value);
      }
    }
  }

  return params.toString();
}

export async function get(resource: string, queryParams = {}, headers = {}, options = {}) {
  const query =
    queryParams && Object.keys(queryParams).length ? '?' + objectToQueryParams(queryParams) : '';

  return await raiseHTTPException(fetch, `${BASE_URL}${resource}${query}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', ...headers, ...getAuthorization() },
    ...options
  });
}

export async function post(
  resource: string,
  body: { [key: string]: any },
  headers = {},
  options = {}
) {
  return await raiseHTTPException(fetch, `${BASE_URL}${resource}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json', ...headers, ...getAuthorization() },
    ...options
  });
}

export async function put(resource: string, body = {}, headers = {}, options = {}) {
  return await raiseHTTPException(fetch, `${BASE_URL}${resource}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json', ...headers, ...getAuthorization() },
    ...options
  });
}

export async function del(resource: string, headers = {}, options = {}) {
  return await raiseHTTPException(fetch, `${BASE_URL}${resource}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', ...headers, ...getAuthorization() },
    ...options
  });
}

export async function postFile(resource: string, formdata: FormData, headers = {}, options = {}) {
  return await raiseHTTPException(fetch, `${BASE_URL}${resource}`, {
    method: 'POST',
    body: formdata,
    headers: { ...headers, ...getAuthorization() },
    ...options
  });
}

export async function putFile(resource: string, formdata: FormData, headers = {}, options = {}) {
  return await raiseHTTPException(fetch, `${BASE_URL}${resource}`, {
    method: 'PUT',
    body: formdata,
    headers: { ...headers, ...getAuthorization() },
    ...options
  });
}
