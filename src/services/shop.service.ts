import { axiosInstance } from "@/config/axios";
import { Shop, ShopCategory } from "@/models/shop.model";
import { useQuery } from "react-query";

export const getShops = async (): Promise<Shop[]> => {
  try {
    const { data } = await axiosInstance.get<Shop[]>("/shops");
    return data;
  } catch (error: any) {
    throw Error(error);
  }
};

export const getShopsByCategory = async (category: string): Promise<Shop[]> => {
  try {
    const { data } = await axiosInstance.get<Shop[]>(
      `/shops/category/${category}`
    );
    return data;
  } catch (error: any) {
    throw Error(error);
  }
};

export const getShopById = async (shopId: string): Promise<Shop> => {
  try {
    const { data } = await axiosInstance.get<Shop>(`/shops/${shopId}`);
    return data;
  } catch (error: any) {
    throw Error(error);
  }
};

export const getShopCategories = async () => {
  return axiosInstance.get<ShopCategory[]>(`/categories`);
};

export const useGetShopsCategoriesQuery = () =>
  useQuery({
    queryKey: "shopCategories",
    queryFn: async () => {
      const { data } = await axiosInstance.get<ShopCategory[]>(`/categories`);
      return data;
    },
  });
