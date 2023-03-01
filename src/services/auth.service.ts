import { axiosInstance } from "@/config/axios";
import { FormLoginSchemaType } from "@/pages/connexion";
import { useMutation, useQuery } from "react-query";

export const useLoginMutation = () =>
  useMutation({
    mutationKey: "login",
    mutationFn: async (creds: FormLoginSchemaType) => {
      const data = await axiosInstance.post("/auth/login", {
        ...creds,
      });
      console.log(data);
    },
  });

export const useMeQuery = (trigger: boolean) =>
  useQuery({
    queryKey: "me",
    queryFn: async () => {
      const data = await axiosInstance.get("/auth/me");
      console.log(data);
    },
    enabled: trigger,
  });
