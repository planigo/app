import { FormLoginSchemaType } from "@/components/Login";
import { axiosInstance } from "@/config/axios";
import { setToken } from "@/helpers/localstorage.helper";
import { User } from "@/models/user.model";
import { useMutation, useQuery } from "react-query";

export const useLoginMutation = (onSuccess: (user: User) => void) =>
  useMutation({
    mutationKey: "login",
    mutationFn: async (creds: FormLoginSchemaType) => {
      const { data } = await axiosInstance.post<{
        access_token: string;
        user: User;
      }>("/auth/login", {
        ...creds,
      });

      setToken(data.access_token);

      return data;
    },
    onSuccess({ user }) {
      onSuccess(user);
    },
  });

export const useMeQuery = () =>
  useQuery({
    queryKey: "me",
    queryFn: async () => {
      const { data } = await axiosInstance.get("/auth/me");

      return data;
    },
  });
