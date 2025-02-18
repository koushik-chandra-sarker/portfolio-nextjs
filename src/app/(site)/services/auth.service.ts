"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import {CredentialsType} from "@/types/Login";


export async function login({ username, password }: CredentialsType, callbackUrl: string) {
    try {
        // Call signIn with the callbackUrl
        const result = await signIn("credentials", { username, password, redirectTo: callbackUrl });
        // TypeScript Fix: Add a type check to ensure `result` isn't `null`
        if (!result) {
            throw new Error("Unexpected error: SignIn did not return a result");
        }

        if (result) {
            // Return the error message if login fails
            console.log("result", result);
            return { message: result };
        }
    } catch (error) {

        if (error instanceof AuthError) {
            console.log("error in login service", error.type);
            switch (error.type) {
                case 'CredentialsSignin':
                    return {
                        message: 'Invalid credentials',
                    };
                default:
                    return {
                        message: 'Something went wrong.',
                    };
            }
        }
        throw error;
    }
}
export async function logout() {
    console.log("************************Logout***********************");
    await signOut();
}
