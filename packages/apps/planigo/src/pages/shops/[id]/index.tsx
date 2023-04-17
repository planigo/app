import React from "react";
import { GetServerSideProps } from "next/types";
import { Shop } from "@planigo/core/lib/shopping/domain/models/Shop.model";
import { Service } from "@planigo/core/lib/shopping/domain/models/Service.model";
import { GetShopById } from "@planigo/core/lib/shopping/usecases/GetShopById.usecase";
import { GetShopServices } from "@planigo/core/lib/shopping/usecases/GetShopServices.usecase"
import { GetShopHours } from "@planigo/core/lib/shopping/usecases/GetShopHours.usecase"
import { Hour } from "@planigo/core/lib/shopping/domain/models/Hour.model";
import { useShoppingService } from "@planigo/adapters/lib/ShoppingService.adapter";
import { useReservationService } from "@planigo/adapters/lib/ReservationService.adapter"
import { GetNextReservations } from "@planigo/core/lib/reservation/usecases/GetNextReservations.usecase"
import { Reservation } from "@planigo/core/lib/reservation/domain/models/Reservation.model";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import ShopHours from "../../../components/hour/ShopHours";
import ServiceCardItem from "../../../components/service/ServiceCardItem";
import { RESERVATION_DATE_FORMAT } from "../../../config/dayjs";

type ShopDetailsPageArgs = {
    shop: Shop;
    shopServices: Service[];
    shopHours: Hour[];
    nextShopReservations: Reservation[];
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const shopId = (query.id as string) || "";
    const shoppingService = useShoppingService()
    const reservationService = useReservationService()
    const shop: Shop = await GetShopById.execute(shoppingService, { shopId });
    const shopServices: Service[] = await GetShopServices.execute(shoppingService, { shopId });
    const shopHours: Hour[] = await GetShopHours.execute(shoppingService, { shopId });
    const nextShopReservations = await GetNextReservations.execute(reservationService, { shopId });

    return {
        props: {
            shop,
            shopServices,
            shopHours,
            nextShopReservations,
        },
    };
};


const ShopDetailsPage = ({
    shop,
    shopServices,
    shopHours,
    nextShopReservations,
}: ShopDetailsPageArgs) => {
    // const setNextAvailableReservation = useReservationStore(
    //   (state) => state.setNextAvailableReservation
    // );
    // const setNextAvailableSlot = useReservationStore(
    //   (state) => state.setNextAvailableSlot
    // );

    // const nextReservation = getNextAvailableReservation(nextReservations);
    // if (!nextReservation) {
    //   throw Error("should have reservation");
    // }

    // const nextAvailableSlot = getNextAvailableSlot(nextReservation.slots);
    // if (!nextAvailableSlot) {
    //   throw Error("should have slot");
    // }

    // setNextAvailableReservation(nextReservation);
    // setNextAvailableSlot(nextAvailableSlot);

    return (
        <Box
            sx={{
                marginTop: 10,
                paddingBottom: 2,
            }}
        >
            <h2>{shop.name}</h2>
            <div>
                <p>{shop.description}</p>
            </div>
            <h4>Choix des prestations</h4>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                }}
            >
                {shopServices.map((service) => (
                    <p>{service.id}</p>
                    // <ServiceCardItem
                    //     key={service.id}
                    //     shopId={shop.id}
                    //     service={service}
                    //   nextAvailableReservationSlot={dayjs(
                    //     getReservationDateHour(
                    //       nextReservation.date,
                    //       nextAvailableSlot.start
                    //     )
                    //   ).format(RESERVATION_DATE_FORMAT)}
                    // />
                ))}
            </Box>
            <h2>Les horaires</h2>
            <ShopHours hours={shopHours} />
        </Box>
    );
};

export default ShopDetailsPage;