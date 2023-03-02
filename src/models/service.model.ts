export type Service = {
    id: string
    name: string
    description: string
    price: number
    duration: number
    shop_id: string
}

export type ServiceCreate = Omit<Service, "id">