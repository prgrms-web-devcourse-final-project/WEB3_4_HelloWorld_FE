'use client';

import {
  QueryClient,
  QueryClientProvider,
  defaultShouldDehydrateQuery,
  isServer,
} from '@tanstack/react-query';

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
    },
  });
};

let browserQueryClient: QueryClient | undefined = undefined;

export const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }

    return browserQueryClient;
  }
};

export default function ReactQueryClientProvider({
  children,
}: React.PropsWithChildren) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
