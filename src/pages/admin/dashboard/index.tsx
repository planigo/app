import { Shop } from '@/models/shop.model'
import { useGetShopsByOwnerId, useGetShopsCategoriesQuery } from '@/services/shop.service'
import React, { useState } from 'react'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Box } from '@mui/material';
import ShopModal from '@/components/backoffice/ShopModal';
import dynamic from 'next/dynamic';
import { useUserStore } from '@/store/user.store';

type AdminDashboardProps = {
    ownerId: string
    ownerShops: Shop[]
}

const AdminDashboardPage = ({ ownerId }: AdminDashboardProps) => {
    const currentUser = useUserStore((state) => state.currentUser);

    const [isShopModalOpen, setIsShopModalOpen] = useState(false)

    const navigateToShopDetailsPage = (shopId: string) => {
        router.push({
            pathname: '/admin/dashboard/shop/[shopId]',
            query: { shopId }
        })
    }

    const deleteShop = (shopId: string) => {
        console.log('delete shop', shopId)
    }

    const { isLoading: isCategoryLoading, data: categories = [] } = useGetShopsCategoriesQuery();
    const { isLoading: isShopLoading, data: ownerShops = [] } = useGetShopsByOwnerId(currentUser?.id);

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
                mt: 10,
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
                        {(!isShopLoading && ownerShops
                        ) ? ownerShops.map((shop) => (
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
                        ))
                            : <p>Pas de boutique</p>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <ShopModal
                isLoading={isCategoryLoading}
                categoriesOptions={categoriesOptions}
                isModalOpen={isShopModalOpen}
                setIsShopModalOpen={setIsShopModalOpen}
                ownerId={ownerId}
            />
        </>
    )
}

export default dynamic(() => Promise.resolve(AdminDashboardPage), {
    ssr: false,
});