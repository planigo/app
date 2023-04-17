import type { Shop } from "../domain/models/Shop.model";
import type { ShoppingServicePort } from "../domain/ports/ShoppingService.port";

export class GetShopById {
    static async execute(shoppingService: ShoppingServicePort, payload: { shopId: string }): Promise<Shop> {
        return shoppingService.getShopById(payload.shopId)
    }
}