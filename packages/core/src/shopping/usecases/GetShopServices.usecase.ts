import type { Service } from "../domain/models/Service.model";
import type { ShoppingServicePort } from "../domain/ports/ShoppingService.port";

export class GetShopServices {
    static async execute(shoppingService: ShoppingServicePort, payload: { shopId: string }): Promise<Service[]> {
        return shoppingService.getShopServices(payload.shopId)
    }
}