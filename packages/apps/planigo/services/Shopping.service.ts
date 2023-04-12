import { useQuery } from "react-query";
import type { ShoppingServicePort } from "@planigo/core/lib/shopping/domain/ports/ShoppingService.port";
import { GetShopCategories } from "@planigo/core/lib/shopping/usecases/GetShopCategories.usecase"
import { useShoppingService } from '@planigo/adapters/lib/ShoppingService.adapter'

export const shoppingService = () => {
    const shoppingAdapter: ShoppingServicePort = useShoppingService()

    const useGetShopsCategoriesQuery = () => {
        return useQuery({
            queryKey: "shopCategories",
            queryFn: async () => {
                return GetShopCategories.execute(shoppingAdapter)
            },
        });
    }


    return {
        useGetShopsCategoriesQuery
    }
}