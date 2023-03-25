import Router from "next/router";
import { axios } from "@/utils/axios";
import { queryClient } from "@/utils/react-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { LoginType, RegisterType, userSchema } from "./schemas";

export const useUser = () => {
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

export const useRegister = () => {
  const { mutate: register, isLoading } = useMutation({
    mutationFn: (data: RegisterType) => axios.post("/auth/register", data),
    onSuccess: () => {
      Router.push("/login");
      toast.success("Register Success");
    },
  });

  return { register, isLoading };
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
