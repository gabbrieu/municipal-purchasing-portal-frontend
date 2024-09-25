export const createfetchInstance = (baseURL: string) => {
  return async (endpoint: string, options: RequestInit = {}) => {
    const url = `${baseURL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`, {
        cause: { errorBody: await response.json() },
      });
    }

    return response.json();
  };
};

export const api = createfetchInstance(
  process.env.API_BASE_URL || 'http://localhost:3000'
);
