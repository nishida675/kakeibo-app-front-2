'use client'; // 追加

import React from "react";
import { Button } from "./ui/button";
import { useRouter } from 'next/navigation';
import { ServerSignIn, ServerSignOut } from "./serverActions";

export function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  const router = useRouter();
  const handleSignIn = async () => {
    await ServerSignIn(provider);
    router.push('/protected-page');
};
  return (
    <Button onClick={handleSignIn} {...props}>
    Sign in with {provider}
    </Button> 
  );
}

export function SignOut({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  const router = useRouter();
  const handleSignOut = async () => {
    await ServerSignOut();
    router.push('/');
};
  return (
    <Button onClick={handleSignOut} {...props}>
    ログアウト
    </Button>
  );
}
