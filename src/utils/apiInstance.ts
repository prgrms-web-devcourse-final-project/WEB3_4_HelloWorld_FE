const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type FetchOptions = RequestInit & {
  headers?: HeadersInit;
  token?: boolean;
};

async function fetcher<T>(url: string, options: FetchOptions = {}): Promise<T> {
  const { token = true, headers, ...restOptions } = options;

  const res = await fetch(`${API_BASE_URL}${url}`, {
    credentials: token ? 'include' : undefined,
    headers: {
      ...(headers || {}),
    },

    ...restOptions,
  });

  const status = res.status;

  if (!res.ok) {
    const errorText = await res.text();
    let errorData = {};

    try {
      errorData = JSON.parse(errorText);
    } catch {
      errorData = { message: errorText };
    }

    throw new Error((errorData as any).message || 'Fetch failed');
  }

  if (status === 204) return {} as T;

  const text = await res.text();

  if (!text) return {} as T;

  try {
    return JSON.parse(text);
  } catch {
    throw new Error('Invalid JSON response');
  }
}

export default fetcher;
