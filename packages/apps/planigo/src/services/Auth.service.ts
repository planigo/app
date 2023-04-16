import type { User } from "@planigo/core/lib/auth/domain/models/User.model";
import type { AuthServicePort } from "@planigo/core/lib/auth/domain/ports/AuthService.port"
import { useAuthService } from "@planigo/adapters/lib/AuthService.adapter"
import { useMutation } from "react-query";
import { FormLoginSchemaType } from "../components/Login";


export const authService = () => {
    const authService: AuthServicePort = useAuthService()

    const useLoginMutation = (onSuccess: (user: User) => void) =>
        useMutation({
            mutationKey: "login",
            mutationFn: async (creds: FormLoginSchemaType) => {
                const response = await authService.login(creds)

                // setToken(response.access_token);

                return response;
            },
            onSuccess({ user }) {
                onSuccess(user);
            },
        });

    return {
        useLoginMutation
    }
}