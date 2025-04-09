const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type FetchOptions = RequestInit & {
  headers?: HeadersInit;
};

async function fetcher<T>(url: string, options?: FetchOptions): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${url}`, {
    credentials: 'include',
    headers: {
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));

    throw new Error(error.message || 'Fetch failed');
  }

  return res.json();
}

export default fetcher;
