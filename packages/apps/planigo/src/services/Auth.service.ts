import type { User } from "@planigo/core/lib/auth/domain/models/User.model";
import type { AuthServicePort } from "@planigo/core/lib/auth/domain/ports/AuthService.port"
import { useAuthService } from "@planigo/adapters/lib/AuthService.adapter"
import { useLocalStorage } from "@planigo/adapters/lib/storage/Localstorage"
import { useMutation } from "react-query";
import { FormLoginSchemaType } from "../components/Login";
import { FormRegisterSchemaType } from "../components/Register";


export const authService = () => {
    const authService: AuthServicePort = useAuthService()

    const useLoginMutation = (onSuccess: (user: User) => void) =>
        useMutation({
            mutationKey: "login",
            mutationFn: async (creds: FormLoginSchemaType) => {
                const response = await authService.login(creds)
                useLocalStorage().setToken(response.access_token)

                return response;
            },
            onSuccess({ user }) {
                onSuccess(user);
            },
        });

    const useRegisterCustomerMutation = ({
        onSuccess,
    }: {
        onSuccess: () => void;
    }) =>
        useMutation({
            mutationFn: async (userPayload: FormRegisterSchemaType) => {
                const { firstName: firstname, lastName: lastname, email, password } = userPayload
                const { data } = await authService.register({ firstname, lastname, email, password })
                return data;
            },
            onSuccess,
        });

    return {
        useLoginMutation,
        useRegisterCustomerMutation
    }
}