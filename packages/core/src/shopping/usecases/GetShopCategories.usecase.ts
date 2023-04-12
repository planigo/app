import { ShopCategory } from "../domain/models/Shop.model";
import { ShoppingServicePort } from "../domain/ports/ShoppingService.port";

export class GetShopCategories {
    static async execute(shoppingService: ShoppingServicePort): Promise<ShopCategory[]> {
        return shoppingService.getShopCategories()
    }
}