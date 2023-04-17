export type Reservation = {
    date: string;
    slots: Slot[];
};

export type Slot = {
    reservationId: string;
    start: string;
    end: string;
    duration: number;
    isAvailable: boolean;
};