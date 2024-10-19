export const createFetchInstance = (baseURL: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async <T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> => {
    const url = `${baseURL}${endpoint}`;

    let response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
    });

    if (!url.includes('/auth/login') && response.status === 401) {
      response = await refreshToken({ baseURL, options, response, url });
    }

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(`Error: ${response.statusText}`, {
        cause: { errorBody },
      });
    }

    return await response.json();
  };
};

async function refreshToken({
  baseURL,
  options,
  response,
  url,
}: {
  baseURL: string;
  url: string;
  options: RequestInit;
  response: Response;
}) {
  try {
    const refreshResponse = await fetch(`${baseURL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (refreshResponse.ok) {
      response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        credentials: 'include',
      });

      return response;
    } else {
      window.location.href = '/auth/login';
      throw new Error('Failed to refresh token, redirecting to login.');
    }
  } catch (error) {
    console.error('Error during token refresh: ', error);
    throw new Error('Token refresh failed');
  }
}

export const api = createFetchInstance(
  process.env.API_BASE_URL || 'http://localhost:3000'
);
