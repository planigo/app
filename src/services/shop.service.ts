import { axiosInstance } from "@/config/axios";
import { Shop, ShopCategory, ShopRequest } from "@/models/shop.model";
import { useMutation, useQuery } from "react-query";

export const getShops = async (): Promise<Shop[]> => {
  try {
    const { data } = await axiosInstance.get<Shop[]>('/shops')
    return data
  } catch (error: any) {
    console.error(error)
    return []
  }
}

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

export const getShopsByOwnerId = async (ownerId: string): Promise<Shop[]> => {
  try {
    const { data } = await axiosInstance.get<Shop[]>(`/shops/owner/${ownerId}`)
    return data || []
  } catch (error) {
    console.error(error)
    return []
  }
}

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

export const useCreateShopMutation = (onSuccess: () => void) =>
  useMutation({
    mutationKey: "createShop",
    mutationFn: async (newShop: ShopRequest) => {
      await axiosInstance.post(`/shops`, newShop);
    },
    onSuccess: () => onSuccess(),
  });
