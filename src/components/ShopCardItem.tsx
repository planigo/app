import React from 'react'
import { Shop } from '@/models/shop.model'
import { Paper, Button } from '@mui/material'
import Link from 'next/link'

type ShopCardProps = {
    shop: Shop
}

const ShopCardItem = ({ shop }: ShopCardProps) => {
    return (
        <section>
            <Paper
                square={true}
                elevation={3}
                sx={{
                    p: 1,
                    my: 4
                }}>
                <h3>{shop.name}</h3>
                <p>{shop.description}</p>
                <Link
                    href={{
                        pathname: '/shops/[id]',
                        query: { id: shop.id }
                    }
                }>
                    <Button variant="outlined">Prendre Rendez-vous</Button>
                </Link>
            </Paper>

        </section>
    )
}

export default ShopCardItem