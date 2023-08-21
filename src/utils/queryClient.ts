// queryClient.js
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

export { queryClient, QueryClientProvider, ReactQueryDevtools };
