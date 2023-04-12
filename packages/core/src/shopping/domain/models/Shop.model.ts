export type Shop = {
    id: string
    name: string
    description: string
    owner_id: string
    category_id: string
}

// VALUE OBJECT
export type ShopCategory = {
    id: string
    slug: string
    name: string
}
