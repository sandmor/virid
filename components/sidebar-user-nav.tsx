"use client";

import { ChevronUp } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
type NavUser = { id?: string; email?: string | null; type?: string };
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { guestRegex } from "@/lib/constants";
import { Loader } from "lucide-react";
import { toast } from "./toast";

export function SidebarUserNav({ user }: { user: NavUser }) {
  const router = useRouter();
  const { signOut } = useClerk();
  const { isSignedIn, user: clerkUser } = useUser();
  // Prefer live Clerk user info if available
  const effectiveEmail = clerkUser?.primaryEmailAddress?.emailAddress || user.email;
  const data = { user: { ...user, email: effectiveEmail } } as any;
  const { setTheme, resolvedTheme } = useTheme();

  const isGuest = !isSignedIn || guestRegex.test(data?.user?.email ?? "");

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {
              <SidebarMenuButton
                className="h-10 bg-background data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                data-testid="user-nav-button"
              >
                <Image
                  alt={user.email ?? "User Avatar"}
                  className="rounded-full"
                  height={24}
                  src={`https://avatar.vercel.sh/${user.email}`}
                  width={24}
                />
                <span className="truncate" data-testid="user-email">
                  {isGuest ? "Guest" : user?.email}
                </span>
                <ChevronUp className="ml-auto" />
              </SidebarMenuButton>
            }
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-popper-anchor-width)"
            data-testid="user-nav-menu"
            side="top"
          >
            {!isGuest && (
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={() => router.push("/settings?tab=archive")}
              >
                Account & Settings
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              className="cursor-pointer"
              data-testid="user-nav-item-theme"
              onSelect={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
            >
              {`Toggle ${resolvedTheme === "light" ? "dark" : "light"} mode`}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild data-testid="user-nav-item-auth">
              <button
                className="w-full cursor-pointer"
                onClick={() => {
                  if (isGuest) {
                    router.push("/login");
                  } else {
                    // Invoke Clerk signOut to clear session, then fall back to server route
                    signOut().then(() => {
                      router.push("/");
                      router.refresh();
                    });
                  }
                }}
                type="button"
              >
                {isGuest ? "Login to your account" : "Sign out"}
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
