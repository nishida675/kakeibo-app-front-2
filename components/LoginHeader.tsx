import { SessionProvider } from "next-auth/react";
import UserButton from "./user-button";

export default function LoginHeader() {
  return (
    <header className="sticky flex border-b">
      <div className="flex items-center justify-end w-full h-16 max-w-3xl px-4 mx-auto sm:px-6">
        <SessionProvider>
          <UserButton />
        </SessionProvider>
      </div>
    </header>
  );
}
