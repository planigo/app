import { Shop } from '@/models/shop.model'
import { getShopsByOwnerId, useGetShopsCategoriesQuery } from '@/services/shop.service'
import { GetServerSideProps } from 'next/types'
import React, { useState } from 'react'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Box } from '@mui/material';
import { useRouter } from 'next/router';
import ShopModal from '@/components/backoffice/ShopModal';

type AdminDashboardProps = {
    ownerId: string
    ownerShops: Shop[]
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const ownerId: string = query.ownerId as string
    const ownerShops = await getShopsByOwnerId(ownerId)

    return {
        props: {
            ownerId,
            ownerShops
        }
    }
}


const AdminDashboardPage = ({ ownerId, ownerShops }: AdminDashboardProps) => {
    const router = useRouter()
    const [isShopModalOpen, setIsShopModalOpen] = useState<boolean>(false)
    const navigateToShopDetailsPage = (shopId: string) => {
        router.push({
            pathname: '/admin/dashboard/shop/[shopId]',
            query: { shopId }
        })
    }
    const deleteShop = (shopId: string) => {
        console.log('delete shop', shopId)
    }

    const { isLoading, data: categories = [] } = useGetShopsCategoriesQuery();

    const categoriesOptions = categories.map(category => ({
        label: category.name,
        value: category.id,
    }));

    return (
        <>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: "space-between",
                my: 2
            }}>
                <h2>Mes boutiques</h2>
                <Button onClick={() => setIsShopModalOpen(true)}>Ajouter une boutique</Button>
            </Box>

            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Shop ID</TableCell>
                            <TableCell>Nom de la boutique</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Catégorie</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ownerShops.map((shop) => (
                            <TableRow
                                key={shop.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {shop.id}
                                </TableCell>
                                <TableCell>
                                    {shop.name}
                                </TableCell>
                                <TableCell >{shop.description}</TableCell>
                                <TableCell>{shop.category_id}</TableCell>
                                <TableCell>
                                    <Button onClick={() => navigateToShopDetailsPage(shop.id)}>Details</Button>
                                    <Button onClick={() => console.log("edit")}>Modifier</Button>
                                    <Button onClick={() => deleteShop(shop.id)}>Supprimer</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ShopModal
                isLoading={isLoading}
                categoriesOptions={categoriesOptions}
                isModalOpen={isShopModalOpen}
                setIsShopModalOpen={setIsShopModalOpen}
                ownerId={ownerId}
            />
        </>
    )
}

export default AdminDashboardPage