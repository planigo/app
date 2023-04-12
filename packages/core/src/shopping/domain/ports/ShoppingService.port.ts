import { ShopCategory } from "../models/Shop.model";

export interface ShoppingServicePort {
    getShopCategories: () => Promise<ShopCategory[]>
}