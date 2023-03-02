export type User = {
    id: string
    firstname: string
    lastname: string
    email: string
    role: 'admin' | 'customer' | 'owner'
    isEmailVerified: boolean
}

export type UserPayload = {
    "firstname": string,
    "lastname": string,
    "email": string,
    "password": string,
    "confirmPassword": string
}