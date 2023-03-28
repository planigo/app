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

export type ReservationRequest = {
  shopId: string;
  serviceId: string;
  start: string;
  userId: string;
};

export type ReservationDate = {
  date: string;
  slot: Slot;
};

export type BookedReservation = {
  reservationId: string;
  shopName: string;
  serviceName: string;
  price: number;
  duration: number;
  start: string;
  isCancelled: boolean;
};

export type AdminDetailedReservation = {
    reservationId: string
    start: string
    firstname: string
    lastname: string
    serviceName: string
    duration: number
    price: number
    isCancelled: boolean
}
