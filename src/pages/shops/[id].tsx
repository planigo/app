import React from 'react'
import { GetServerSideProps } from 'next/types'
import { Shop } from '@/models/shop.model'
import { getShopById } from '@/services/shop.service'
import { getServicesByShopId } from '@/services/service.service'
import { Service } from '@/models/service.model'
import { Hour } from '@/models/hour.model'
import { getHoursByShopId } from '@/services/hour.service'
import { getDayLabel } from '@/helpers/days.helper'


type ShopDetailsPageArgs = {
  shop: Shop
  shopServices: Service[]
  shopHours: Hour[]
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const shopId = context.query.id as string || ""
  const shop: Shop = await getShopById(shopId)
  const shopServices: Service[] = await getServicesByShopId(shopId)
  const shopHours: Hour[] = await getHoursByShopId(shopId)

  return {
    props: {
      shop,
      shopServices,
      shopHours
    }
  }
}

const ShopDetailsPage = ({ shop, shopServices, shopHours }: ShopDetailsPageArgs) => {
  return <>
    <h2>Info Boutique</h2>
    <div>
      <p>{shop.id}</p>
      <p>{shop.name}</p>
      <p>{shop.description}</p>
    </div>
    <h2>Choix des prestations</h2>
    <div>
      {shopServices.map(services => (
        <div key={services.id}>
          <p>{services.id}</p>
          <p>{services.name}</p>
          <p>{services.description}</p>
          <p>{services.price} €</p>
          <p>{services.duration} min</p>
          <p>{services.shopId}</p>
        </div>
      ))}
    </div>
    <h2>Les horaires</h2>
    {shopHours.map(hour => (
      <section key={hour.id}>
        <p>{hour.id}</p>
        <p>{hour.day} - {getDayLabel(hour.day)}</p>
        <p>{hour.start}</p>
        <p>{hour.end}</p>
        <p>{hour.shopId}</p>
      </section>
    ))}

  </>


}

export default ShopDetailsPage