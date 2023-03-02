import { axiosInstance } from "@/config/axios";
import {
    AdminDetailedReservation,
    BookedReservation,
    Reservation,
    ReservationRequest,
} from "@/models/reservation.model";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const getNextReservationSlots = async (shopId: string) => {
    try {
        const { data } = await axiosInstance.get<Reservation[]>(
            `/reservation/slots/${shopId}`
        );
        return data;
    } catch (error: any) {
        throw Error(error);
    }
};

export const getReservationBookedByUser = async (userId: string) => {
    try {
        const { data } = await axiosInstance.get<BookedReservation[]>(`/reservation/slots/users/${userId}`)
        return data || []
    } catch (error: any) {
        throw Error(error)
    }
}

export const useMakeReservationMutation = (onSuccess: () => void) =>
    useMutation({
        mutationKey: "makeReservation",
        mutationFn: async (reservationDemand: ReservationRequest) => {
            await axiosInstance.post(`/reservation`, { ...reservationDemand });
        },
        onSuccess: () => onSuccess(),
    });

export const useGetReservationsBookedByUserQuery = (
    userId: string | undefined
) =>
    useQuery({
        queryKey: ["getReservationsBookedByUser", userId],
        queryFn: async () => {
            const { data } = await axiosInstance.get<BookedReservation[]>(
                `/reservation/slots/users/${userId}`
            );

            return data;
        },
        enabled: !!userId,
        placeholderData: [],
    });

export const useCancelReservationQuery = (
    reservationId: string | undefined
) => {
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: "cancelReservation",
        queryFn: () => axiosInstance.get(`/reservation/cancel/${reservationId}`),
        enabled: !!reservationId,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["getReservationsBookedByUser"],
            });
        },
    });
};

// Backoffice

export const getSlotsBookedFilteredByShop = async (shopId: string) => {
    try {
        const { data } = await axiosInstance.get<AdminDetailedReservation[]>(`/reservation/slots/shop/${shopId}`)
        return data || []
    } catch (error: any) {
        throw Error(error)
    }
}