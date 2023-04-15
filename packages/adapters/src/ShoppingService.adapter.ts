import { axiosInstance } from "./config/axios";
import type { Shop, ShopCategory } from "@planigo/core/src/shopping/domain/models/Shop.model";
import { ShoppingServicePort } from "@planigo/core/src/shopping/domain/ports/ShoppingService.port";

export function useShoppingService(): ShoppingServicePort {
    const getShopCategories = async (): Promise<ShopCategory[]> => {
        const response = await axiosInstance.get<ShopCategory[]>(`/categories`)
        return response.data
    }
    const getShopsFilteredByCategory = async (category: string): Promise<Shop[]> => {
        const response = await axiosInstance.get<Shop[]>(`/shops/category/${category}`)
        return response.data
    }
    return {
        getShopCategories,
        getShopsFilteredByCategory
    }
}