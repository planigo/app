import { axiosInstance } from "@/config/axios";
import { Hour } from "@/models/hour.model";

export const getHoursByShopId = async (shopId: string): Promise<Hour[]> => {
  try {
    const { data } = await axiosInstance.get<Hour[]>(`/hours/shop/${shopId}`);
    return data;
  } catch (error: any) {
    throw Error(error);
  }
};
