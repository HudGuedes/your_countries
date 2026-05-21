const API_BASE = '/api/v1';

async function request(endpoint, options = {}) {
  const config = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    const errorMessage = data.error || data.errors?.join(', ') || 'Erro na requisição';
    const error = new Error(errorMessage);
    error.status = response.status;
    throw error;
  }

  return data;
}

const api = {
  get: (endpoint) => request(endpoint, { method: 'GET' }),
  post: (endpoint, body) => request(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  put: (endpoint, body) => request(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (endpoint, body) => request(endpoint, {
    method: 'DELETE',
    body: body ? JSON.stringify(body) : undefined
  }),
};
