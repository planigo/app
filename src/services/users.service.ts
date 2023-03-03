import { FormRegisterSchemaType } from "@/components/Register";
import { axiosInstance } from "@/config/axios";
import { User } from "@/models/user.model";
import { useMutation } from "react-query";

export const getUsers = async (): Promise<User[]> => {
  try {
    const { data } = await axiosInstance.get<User[]>("/users");
    return data;
  } catch (error: any) {
    throw Error(error);
  }
};

export const useCreateCustomerMutation = ({
  onSuccess,
}: {
  onSuccess: () => void;
}) =>
  useMutation({
    mutationFn: async (userPayload: FormRegisterSchemaType) => {
      const { data } = await axiosInstance.post<User>(
        "/users/customer",
        userPayload
      );
      return data;
    },
    onSuccess,
  });
