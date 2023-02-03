export type User = {
    id: string
    firstname: string
    lastname: string
    email: string
    password: string
    role: 'admin' | 'customer' | 'owner'
    isEmailVerified: boolean
}