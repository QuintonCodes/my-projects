import { getSession, getUserByEmail } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getSession();

  if (!session?.email) {
    return NextResponse.json(
      { user: null, isAuthenticated: false },
      { status: 401 }
    );
  }

  const user = await getUserByEmail(session.email);

  return NextResponse.json({ user, isAuthenticated: !!user });
}
