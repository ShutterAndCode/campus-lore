import { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import AuthContext from "@/auth/context/AuthContext";
import { getCurrentUser, logout as logoutRequest } from "@/auth/api/auth.api";

export const AUTH_QUERY_KEY = ["auth", "currentUser"];

export default function AuthProvider({ children }) {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: getCurrentUser,
    retry: false,
    throwOnError: false,
  });

  const logoutMutation = useMutation({
    mutationFn: logoutRequest,
    onSettled: () => {
      queryClient.setQueryData(AUTH_QUERY_KEY, null);
      queryClient.removeQueries({ queryKey: AUTH_QUERY_KEY });
    },
  });

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  const refetchUser = async () => {
    const result = await refetch();
    return result.data ?? null;
  };

  const value = useMemo(
    () => ({
      user: user ?? null,
      isAuthenticated: Boolean(user),
      isLoading,
      logout,
      refetchUser,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, isLoading, isFetching]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}