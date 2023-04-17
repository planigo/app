import { useQuery } from "react-query";
import type { Shop, ShopCategory } from "@planigo/core/lib/shopping/domain/models/Shop.model";
import type { ShoppingServicePort } from "@planigo/core/lib/shopping/domain/ports/ShoppingService.port"
import { GetShopCategories } from "@planigo/core/lib/shopping/usecases/GetShopCategories.usecase"
import { GetShopsByCategory } from "@planigo/core/lib/shopping/usecases/GetShopsByCategory.usecase"
import { useShoppingService } from '@planigo/adapters/lib/ShoppingService.adapter'

export const shoppingService = () => {
    const shoppingAdapter: ShoppingServicePort = useShoppingService()

    const useGetShopsCategoriesQuery = () => {
        return useQuery({
            queryKey: "shopCategories",
            queryFn: async (): Promise<ShopCategory[]> => {
                return GetShopCategories.execute(shoppingAdapter)
            },
        });
    }

    const useGetShopsByCategoryQuery = (category: string) => {
        return useQuery({
            queryKey: ["shopsByCategory", category],
            queryFn: async (): Promise<Shop[]> => {
                return GetShopsByCategory.execute(shoppingAdapter, category)
            },
        });
    }


    return {
        useGetShopsCategoriesQuery,
        useGetShopsByCategoryQuery
    }
}