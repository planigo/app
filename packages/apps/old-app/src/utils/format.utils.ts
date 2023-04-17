export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fr', { style: 'currency', currency: 'EUR' }).format(price)
}