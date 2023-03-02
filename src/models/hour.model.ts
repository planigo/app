
export type Hour = {
    id: string
    day: number
    start: string
    end: string
    shop_id: string
}

export type CreateHour = Omit<Hour, "id">