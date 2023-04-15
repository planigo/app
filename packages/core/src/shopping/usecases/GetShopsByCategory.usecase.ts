import { Shop } from "../domain/models/Shop.model";
import { ShoppingServicePort } from "../domain/ports/ShoppingService.port";

export class GetShopsByCategory {
    static async execute(shoppingService: ShoppingServicePort, category: string): Promise<Shop[]> {
        return shoppingService.getShopsFilteredByCategory(category)
    }
}