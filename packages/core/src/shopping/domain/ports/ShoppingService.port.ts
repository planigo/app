import type { Hour } from "../models/Hour.model";
import type { Service } from "../models/Service.model";
import type { Shop, ShopCategory } from "../models/Shop.model";

export interface ShoppingServicePort {
    getShopCategories: () => Promise<ShopCategory[]>
    getShopById: (shopId: string) => Promise<Shop>
    getShopServices: (shopId: string) => Promise<Service[]>
    getShopHours: (shopId: string) => Promise<Hour[]>
    getShopsFilteredByCategory: (category: string) => Promise<Shop[]>
}