import { axiosInstance } from "@/config/axios";
import { CreateHour, Hour } from "@/models/hour.model";
import { useMutation } from "react-query";

export const getHoursByShopId = async (shopId: string): Promise<Hour[]> => {
  try {
    const { data } = await axiosInstance.get<Hour[]>(`/hours/shop/${shopId}`);
    return data;
  } catch (error: any) {
    throw Error(error);
  }
};


export const useCreateHourMutation = (onSuccess: () => void) =>
  useMutation({
    mutationKey: "createHour",
    mutationFn: (newHour: CreateHour) => axiosInstance.post(`/hours`, newHour),
    onSuccess: () => onSuccess(),
  });