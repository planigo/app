import { getFormattedReservationDate } from '@/helpers/reservation.helper'
import { Reservation, ReservationRequest } from '@/models/reservation.model'
import { Service } from '@/models/service.model'
import { makeReservation } from '@/services/reservation.service'
import { getServiceById } from '@/services/service.service'
import { useReservationStore } from '@/store/reservation.store'
import { Paper, Button, Snackbar } from '@mui/material'
import { GetServerSideProps } from 'next'
import React, { useState } from 'react'

type ReservationPageProps = {
  shopId: string
  service: Service
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const shopId = query?.id
  const serviceId = query?.serviceId as string
  if (!serviceId)
    throw new Error(`Cannot get service`);

  const service: Service = await getServiceById(serviceId)

  return {
    props: {
      shopId,
      service
    }
  }
}

const ReservationPage = ({ shopId, service }: ReservationPageProps) => {
  const [isServiceBooked, setIsServiceBooked] = useState<boolean>(true)
  const nextAvailableReservation = useReservationStore((state) => state.nextAvailableReservation)
  const nextAvailableSlot = useReservationStore((state) => state.nextAvailableSlot)


  const reservationHandler = async ({ shopId, serviceId, start, userId }: ReservationRequest) => {
    const reservationDemand: ReservationRequest = {
      shopId,
      serviceId,
      start,
      userId: "b43a2594-a669-11ed-b5c1-0242ac150002"
    }
    await makeReservation(reservationDemand)
    setIsServiceBooked(true)
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
          <span>{service.duration} min - {service.price}€</span>
        </Paper>
      </section>
      <section>
        {(nextAvailableReservation && nextAvailableSlot) &&
          <>
            <h3>Date et heure</h3>
            <Paper
              elevation={3}
              sx={{
                p: 1,
              }}>
              <span>{getFormattedReservationDate(nextAvailableReservation.date, nextAvailableSlot)}</span>
            </Paper>
          </>
        }
      </section>
      <Button
        onClick={() => {
          reservationHandler({
            shopId,
            serviceId: service.id,
            start: `${nextAvailableReservation!.date} ${nextAvailableSlot!.start}`,
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
      <Snackbar
        open={isServiceBooked}
        autoHideDuration={4000}
        message="Réservation confirmée"
      />
    </>
  )
}

export default ReservationPage