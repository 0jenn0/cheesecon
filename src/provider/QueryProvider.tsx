'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const queryClient = new QueryClient();

export default function ReactQueryClientProvider({
  children,
}: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}
