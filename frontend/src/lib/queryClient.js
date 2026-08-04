import { QueryClient } from "@tanstack/react-query";

const FIVE_MINUTES = 5 * 60 * 1000;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: FIVE_MINUTES,
      gcTime: 10 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: false,
    },

    mutations: {
      retry: 0,
    },
  },
});
//Keeps cached data around for 10 minutes after it becomes unused.