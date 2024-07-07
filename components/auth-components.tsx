'use client'; // 追加

import React from "react";
import { Button } from "./ui/button";
import { useRouter } from 'next/navigation'; // next/navigation をインポートする
import { ServerSignIn, ServerSignOut } from "./serverActions";

export function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  const router = useRouter();
  
  const handleSignIn = async () => {
    await ServerSignIn(provider);
    router.push('/Month');
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
  };
  
  return (
    <Button onClick={handleSignOut} {...props}>
      ログアウト
    </Button>
  );
}