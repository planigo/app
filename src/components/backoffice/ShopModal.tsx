import { Shop, ShopRequest } from '@/models/shop.model'
import { useCreateShopMutation } from '@/services/shop.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal, Box, Typography, TextField, Button, Autocomplete } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type ShopModalProps = {
    shop?: Shop
    isModalOpen: boolean
    setIsShopModalOpen: (value: boolean) => void
    isLoading: boolean
    categoriesOptions: { label: string, value: string }[]
    ownerId: string
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const ShopModal = ({ isModalOpen, setIsShopModalOpen, categoriesOptions, isLoading, shop, ownerId }: ShopModalProps) => {
    const schema = z.object({
        name: z.string(),
        description: z.string(),
        category_id: z.string()
    })

    const {
        register,
        setValue,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(schema),
    });
    const { mutate: createShop } = useCreateShopMutation(() => {
        setIsShopModalOpen(false)
        reset()
    });

    const submit = async (shopData: any) => {
        const newShop: ShopRequest = {
            name: shopData.name,
            description: shopData.description,
            category_id: shopData.category_id,
            owner_id: ownerId
        }

        createShop(newShop)
    };


    return (
        <Modal
            open={isModalOpen}
            onClose={() => setIsShopModalOpen(false)}
            aria-labelledby="modal-modal-title"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {shop ? <p>Modifier la boutique</p> : <p>Ajouter une boutique</p>}
                </Typography>
                <form onSubmit={handleSubmit(submit)}>
                    <Box sx={{
                        my: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}>
                        <TextField

                            label="Nom"
                            variant="standard"
                            type="text"
                            {...register("name")}
                        />
                        <TextField
                            label="Description"
                            variant="standard"
                            type="text"
                            {...register("description")}
                        />
                        <Autocomplete
                            loading={isLoading}
                            disablePortal
                            options={categoriesOptions}
                            getOptionLabel={(option) => option.label}
                            isOptionEqualToValue={(option, newValue) => option.value === newValue.value}
                            renderInput={(params) => (
                                <TextField {...params} label="Catégorie" variant="standard" />
                            )}
                            onChange={(event, value) => setValue("category_id", value?.value || "")}
                        />
                    </Box>
                    <Box sx={{
                        mt: 2,
                        textAlign: 'right'
                    }}>
                        <Button type="submit">Ajouter</Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    )
}

export default ShopModal