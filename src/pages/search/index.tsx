import React from 'react'
import Link from 'next/link'
import { GetServerSideProps } from 'next/types'
import Button from '@mui/material/Button';
import { getShopsByCategory } from '@/services/shop.service'
import { Shop } from '@/models/shop.model'

type SearchResultPageArgs = {
    shopsFilteredByCategory: Shop[]
}

export const getServerSideProps: GetServerSideProps<SearchResultPageArgs> = async (context) => {
    const shopCategory = context.query.category as string || ""
    const shopsFilteredByCategory = await getShopsByCategory(shopCategory)
    return {
        props: {
            shopsFilteredByCategory
        }
    }
}

const SearchResultPage = ({ shopsFilteredByCategory }: SearchResultPageArgs) => {
    return <div>
        {shopsFilteredByCategory
            ? shopsFilteredByCategory.map((shop: Shop) => (
                <div key={shop.id}>
                    <div>
                        <p>{shop.id}</p>
                        <p>{shop.name}</p>
                        <p>{shop.description}</p>
                    </div>
                    <Link href={{
                        pathname: '/shops/[id]',
                        query: { id: shop.id }
                    }}>
                        <Button variant="outlined">Prendre Rendez-vous</Button>
                    </Link>
                </div>))
            : <p>Pas de Boutique</p>
        }
    </div>
}

export default SearchResultPage