import type { Shop, ShopCategory } from "../models/Shop.model";

export interface ShoppingServicePort {
    getShopCategories: () => Promise<ShopCategory[]>
    getShopsFilteredByCategory: (category: string) => Promise<Shop[]>
}