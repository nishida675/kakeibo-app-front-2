"use server";

import {auth, signIn, signOut} from "@/auth";

export async function ServerSignIn(provider: any) {
    await signIn(provider);
}

export async function ServerSignOut() {
    await signOut();
}