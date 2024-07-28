"use client";

import { cn } from "@/lib/utils";
import CustomLink from "./custom-link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import React from "react";
import { usePathname } from "next/navigation";
import { useLoginUser } from "./hooks/useLoginUser";

export function MainNav() {
  const pathname = usePathname();
  const { loginUser} = useLoginUser();
  const skill = {
    id: loginUser ? loginUser : null, // スキルIDの例
  };

  return (
    <div className="flex gap-2 sm:gap-4 items-center">
       {pathname === '/' ? (
       <NavigationMenu>
       <NavigationMenuList>
         <NavigationMenuItem>
           <NavigationMenuLink
             href="/Month"
             className={`${navigationMenuTriggerStyle()} ${pathname === '/' ? ' border-4 border-green-500' : ''}`}
           >
             use App
           </NavigationMenuLink>
         </NavigationMenuItem>
         </NavigationMenuList>
      </NavigationMenu>
       ) : (
        <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/Month"
              className={`${navigationMenuTriggerStyle()} ${pathname === '/Month' ? ' border-b-4 border-b-green-500' : ''}`}
            >
              ひと月の収支
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href={`/Year/${skill.id}`}
              className={`${navigationMenuTriggerStyle()} ${/^\/Year\/.+$/.test(pathname) ? 'border-b-4 border-b-green-500' : ''}`}
            >
              一年の収支
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href={`/input/${skill.id}`}
              className={`${navigationMenuTriggerStyle()} ${/^\/input\/.+$/.test(pathname) ? 'border-b-4 border-b-green-500' : ''}`}
            >
              登録
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      )}
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
