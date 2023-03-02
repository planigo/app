import { AdminDetailedReservation } from '@/models/reservation.model'
import { Service } from '@/models/service.model'
import { getSlotsBookedFilteredByShop } from '@/services/reservation.service'
import { getServicesByShopId } from '@/services/service.service'
import { formatPrice } from '@/utils/format.utils'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

type AdminShopDetailsProps = {
  shopServices: Service[]
  reservations: AdminDetailedReservation[]
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const shopId: string = query.shopId as string
  const shopServices = await getServicesByShopId(shopId)
  const reservations = await getSlotsBookedFilteredByShop(shopId)
  
  return {
    props: {
      shopServices,
      reservations
    }
  }
}


const AdminShopDetailsPage = ({ shopServices, reservations }: AdminShopDetailsProps) => {
  const router = useRouter()
  const navigateToServiceDetailsPage = (serviceId: string) => {
    // router.push({
    //   pathname: '/admin/dashboard/serviceId/[serviceId]',
    //   query: { serviceId }
    // })
    console.log('navigate to detail service')
  }
  const deleteService = (serviceId: string) => {
    console.log('delete service', serviceId)
  }
  return (
    <>
      <h2>Les prestations</h2>
      <Button>Ajouter une prestation</Button>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Service ID</TableCell>
              <TableCell>Prestation</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Prix</TableCell>
              <TableCell>Durée</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shopServices.map((service) => (
              <TableRow
                key={service.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {service.id}
                </TableCell>
                <TableCell>
                  {service.name}
                </TableCell>
                <TableCell>
                  {service.description}
                </TableCell>
                <TableCell>
                  {formatPrice(service.price)}
                </TableCell>
                <TableCell>
                  {service.duration} minutes
                </TableCell>
                <TableCell>
                  <Button onClick={() => navigateToServiceDetailsPage(service.id)}>Details</Button>
                  <Button onClick={() => deleteService(service.id)}>Supprimer</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <h2>Les réservations</h2>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Reservation ID</TableCell>
              <TableCell>Heure de début</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Prestation</TableCell>
              <TableCell>Prix</TableCell>
              <TableCell>Durée</TableCell>
              <TableCell>Annulée ?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow
                key={reservation.reservationId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {reservation.reservationId}
                </TableCell>
                <TableCell>
                  {reservation.start}
                </TableCell>
                <TableCell>
                  {reservation.firstname} {reservation.lastname}
                </TableCell>
                <TableCell>
                  {reservation.serviceName}
                </TableCell>
                <TableCell>
                  {reservation.duration} minutes
                </TableCell>
                <TableCell>
                  {formatPrice(reservation.price)}
                </TableCell>
                <TableCell>
                  {reservation.isCancelled ? <span>Oui</span> : <span>Non</span>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <h2>Les horaires</h2>
    </>
  )
}

export default AdminShopDetailsPage