import React from "react";
import { GetServerSideProps } from "next/types";
import { Shop } from "@planigo/core/lib/shopping/domain/models/Shop.model";
import { Service } from "@planigo/core/lib/shopping/domain/models/Service.model";
import { GetShopById } from "@planigo/core/lib/shopping/usecases/GetShopById.usecase";
import { GetShopServices } from "@planigo/core/lib/shopping/usecases/GetShopServices.usecase"
import { GetShopHours } from "@planigo/core/lib/shopping/usecases/GetShopHours.usecase"
import { Hour } from "@planigo/core/lib/shopping/domain/models/Hour.model";
import { useShoppingService } from "@planigo/adapters/lib/ShoppingService.adapter";

type ShopDetailsPageArgs = {
    shop: Shop;
    shopServices: Service[];
    shopHours: Hour[];
    // nextReservations: Reservation[];
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const shopId = (query.id as string) || "";
    const shoppingService = useShoppingService()
    const shop: Shop = await GetShopById.execute(shoppingService, { shopId });
    const shopServices: Service[] = await GetShopServices.execute(shoppingService, { shopId });
    const shopHours: Hour[] = await GetShopHours.execute(shoppingService, { shopId });
    // const nextReservations = await getNextReservationSlots(shopId);
    console.log(shop)
    console.log(shopServices)
    console.log(shopHours)
    return {
        props: {
            shop,
            shopServices,
            shopHours,
            // nextReservations,
        },
    };
};


const ShopDetailsPage = () => {
    return (
        <div>index</div>
    )
}

export default ShopDetailsPage