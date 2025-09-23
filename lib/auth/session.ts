import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db/prisma";
import { readGuestSession } from "./guest";

export type AppSession = {
  user: { id: string; type: "guest" | "regular"; email?: string | null };
};

export async function getAppSession(): Promise<AppSession | null> {
  // If Clerk environment variables are not present (e.g. local CI/test), skip auth() and fall back to guest logic.
  const hasClerkEnv =
    !!process.env.CLERK_SECRET_KEY &&
    !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (hasClerkEnv) {
    try {
      const a = auth();
      if (a.userId) {
        try {
          await prisma.user.upsert({
            where: { id: a.userId },
            update: { email: (a.sessionClaims as any)?.email as string | undefined },
            create: {
              id: a.userId,
              email: ((a.sessionClaims as any)?.email as string | undefined) || "user@unknown",
            },
          });
        } catch {
          /* non-fatal */
        }
        return {
          user: {
            id: a.userId,
            type: "regular",
            email: (a.sessionClaims as any)?.email as string | undefined,
          },
        };
      }
    } catch {
      // Ignore – treat as guest below.
    }
  }

  // Guest cookie fallback
  const guest = await readGuestSession();
  if (guest) {
    try {
      await prisma.user.upsert({
        where: { id: guest.uid },
        update: { email: guest.email },
        create: { id: guest.uid, email: guest.email },
      });
    } catch {
      /* ignore */
    }
    return { user: { id: guest.uid, type: "guest", email: guest.email } };
  }

  return null;
}
