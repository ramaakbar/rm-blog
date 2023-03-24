import { useEffect } from "react";
import Router from "next/router";
import { axios } from "@/utils/axios";
import { queryClient } from "@/utils/react-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { LoginType, userSchema } from "./schemas";

export const useUser = ({ isProtected = false } = {}) => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const data = await axios.get("/auth/me");
      return userSchema.parse(data);
    },
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (!isProtected || !user) return;

    if (isProtected && user) {
      Router.push("/");
    }
  });

  return { user, isLoading, error };
};

export const useLogin = () => {
  const { mutate: login, isLoading } = useMutation({
    mutationFn: (data: LoginType) => axios.post("/auth", data),
    onSuccess: () => {
      Router.push("/");
      toast.success("Login Success");
    },
  });

  return { login, isLoading };
};

export const useLogout = () => {
  const { mutate: logout } = useMutation({
    mutationFn: () => axios.post("/auth/logout"),
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["user"] });
      toast.success("Logout Success");
    },
  });
  return { logout };
};
