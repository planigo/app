import type { Hour } from "../domain/models/Hour.model";
import type { ShoppingServicePort } from "../domain/ports/ShoppingService.port";

export class GetShopHours {
    static async execute(shoppingService: ShoppingServicePort, payload: { shopId: string }): Promise<Hour[]> {
        return shoppingService.getShopHours(payload.shopId)
    }
}