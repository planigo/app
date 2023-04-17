import { User } from "../../domain/models/User.model"

export type LoginOutput = {
    access_token: string
    user: User
}