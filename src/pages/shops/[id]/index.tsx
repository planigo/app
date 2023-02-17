import React from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next/types'
import { Shop } from '@/models/shop.model'
import { getShopById } from '@/services/shop.service'
import { getServicesByShopId } from '@/services/service.service'
import { Service } from '@/models/service.model'
import { Hour } from '@/models/hour.model'
import { getHoursByShopId } from '@/services/hour.service'
import ShopHours from '@/components/hours/ShopHours'
import ServiceCardItem from '@/components/ServiceCardItem'
import { getNextReservationSlots } from '@/services/reservation.service'
import { getNextAvailableReservation, getNextAvailableSlot } from '@/helpers/reservation.helper';
import { Reservation } from '@/models/reservation.model'

type ShopDetailsPageArgs = {
  shop: Shop
  shopServices: Service[]
  shopHours: Hour[]
  nextReservations: Reservation[]
}

export const getServerSideProps: GetServerSideProps = async ({ query, locale, defaultLocale }) => {
  const shopId = query.id as string || ""
  const shop: Shop = await getShopById(shopId)
  const shopServices: Service[] = await getServicesByShopId(shopId)
  const shopHours: Hour[] = await getHoursByShopId(shopId)
  const nextReservations = await getNextReservationSlots(shopId)
  return {
    props: {
      // ...(await serverSideTranslations(locale || defaultLocale!, [
      //   'common',
      // ])),
      shop,
      shopServices,
      shopHours,
      nextReservations
    }
  }
}

const ShopDetailsPage = ({ shop, shopServices, shopHours, nextReservations }: ShopDetailsPageArgs) => {
  const getFormattedNextReservation = (nextReservations: Reservation[] = []): string => {
    const nextReservation = getNextAvailableReservation(nextReservations)
    if (!nextReservation) {
      throw Error('should have reservation')
    }
    const nextAvailableSlot = getNextAvailableSlot(nextReservation.slots)
    if (!nextAvailableSlot) {
      throw Error('should have slot')
    }
    return `${nextReservation.date} à ${nextAvailableSlot?.start}`
  }

  return <>
    <h2>Info Boutique</h2>
    <div>
      <p>{shop.name}</p>
      <p>{shop.description}</p>
    </div>
    <h2>Choix des prestations</h2>
    <article>
      {shopServices.map(service => (
        <ServiceCardItem
          key={service.id}
          shopId={shop.id}
          service={service}
          nextAvailableReservationSlot={getFormattedNextReservation(nextReservations)}
        />
      ))}
    </article>
    <h2>Les horaires d'ouverture</h2>
    <ShopHours hours={shopHours} />
  </>


}

export default ShopDetailsPage