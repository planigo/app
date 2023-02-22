import ReservationSlotsSchedule from '@/components/ReservationSlotsSchedule'
import { RESERVATION_DATE_FORMAT } from '@/config/dayjs'
import { getReservationDateHour } from '@/helpers/reservation.helper'
import { Reservation, ReservationRequest } from '@/models/reservation.model'
import { Service } from '@/models/service.model'
import { getNextReservationSlots, makeReservation } from '@/services/reservation.service'
import { getServiceById } from '@/services/service.service'
import { useReservationStore } from '@/store/reservation.store'
import { Paper, Button, Snackbar } from '@mui/material'
import dayjs from 'dayjs'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

type ReservationPageProps = {
  shopId: string
  service: Service
  nextReservationSlots: Reservation[]
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const shopId = query?.id as string
  const serviceId = query?.serviceId as string
  if (!serviceId)
    throw new Error(`Cannot get service`);
  if (!shopId)
    throw new Error("Shop does not exist");

  const service: Service = await getServiceById(serviceId)

  const nextReservationSlots: Reservation[] = await getNextReservationSlots(shopId)

  return {
    props: {
      shopId,
      service,
      nextReservationSlots
    }
  }
}

const ReservationPage = ({ shopId, service, nextReservationSlots }: ReservationPageProps) => {
  const router = useRouter()
  const [isServiceBooked, setIsServiceBooked] = useState<boolean>(false)
  const reservationDateChose = useReservationStore((state) => state.reservationDateChose)
  const cleanReservationDateChose = useReservationStore((state) => state.cleanReservationDateChose)
  const setIsReservationChosen = useReservationStore((state) => state.setIsReservationChosen)
  const isReservationChosen = useReservationStore((state) => state.isReservationChosen)


  const chooseReservationDate = () => {
    setIsReservationChosen(false)
  }

  const reservationHandler = async ({ shopId, serviceId, start, userId }: ReservationRequest) => {
    const reservationDemand: ReservationRequest = {
      shopId,
      serviceId,
      start,
      userId: "b43a2594-a669-11ed-b5c1-0242ac150002"
    }
    await makeReservation(reservationDemand)

    setIsReservationChosen(false)
    cleanReservationDateChose()
    setIsServiceBooked(true)
  }

  const onSnackbarClose = () => {
    setIsServiceBooked(false)
    router.replace('/')
  }

  return (
    <>
      <section>
        <h3>Prestation</h3>
        <Paper
          elevation={3}
          sx={{
            p: 1,
          }}>
          <p>
            <strong>{service.name}</strong>
          </p>
          <span>{service.duration} min - {new Intl.NumberFormat('fr', { style: 'currency', currency: 'EUR' }).format(service.price)}</span>
        </Paper>
      </section>
      {
        isReservationChosen
          ? <section>
            {reservationDateChose &&
              <>
                <h3>Date et heure</h3>
                <Paper
                  elevation={3}
                  sx={{
                    p: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}>
                  <div>
                    <p>{dayjs(getReservationDateHour(reservationDateChose.date, reservationDateChose.slot.start)).format(RESERVATION_DATE_FORMAT)}</p>
                    <p>Fin prévue à {dayjs(getReservationDateHour(reservationDateChose.date, reservationDateChose.slot.start)).add(service.duration, "m").format("HH:mm")}</p>
                  </div>
                  <div>
                    <Button onClick={chooseReservationDate} variant='outlined'>Choix du créneau</Button>
                  </div>
                </Paper>
                <Button
                  onClick={() => {
                    reservationHandler({
                      shopId,
                      serviceId: service.id,
                      start: `${reservationDateChose.date} ${reservationDateChose?.slot.start}`,
                      userId: ""
                    })
                  }}
                  variant="outlined"
                  sx={{
                    my: 4,
                  }}
                >
                  Confirmer la réservation
                </Button>
                {/* <Snackbar
                  open={isServiceBooked}
                  autoHideDuration={3000}
                  onClose={onSnackbarClose}
                  message="Réservation confirmée, vous allez être redirigé vers la page d'accueil"
                /> */}
              </>
            }
          </section>
          : <section>
            <h3>Choix du créneau</h3>
            {nextReservationSlots.length
              ? <ReservationSlotsSchedule reservationSlots={nextReservationSlots} />
              : <p>is loading...</p>
            }
          </section>
      }
    </>
  )
}

export default ReservationPage