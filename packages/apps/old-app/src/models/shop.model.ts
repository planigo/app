export type Shop = {
    id: string
    name: string
    description: string
    owner_id: string
    category_id: string
}

export type ShopCategory = {
    id: string
    slug: string
    name: string
}

export type ShopRequest = Omit<Shop, "id">