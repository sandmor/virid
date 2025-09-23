import { NextResponse } from "next/server";
import { clearGuestSession } from "@/lib/auth/guest";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const a = auth();
    if (a.sessionId) {
      try { await clerkClient.sessions.revokeSession(a.sessionId); } catch {}
    } else {
      await clearGuestSession();
    }
  } catch {}
  return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"));
}
