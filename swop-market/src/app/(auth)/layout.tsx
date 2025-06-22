import type { Metadata } from "next";
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const pathname =
    headersList.get("x-invoke-path") ?? headersList.get("referer") ?? "";

  let dynamicPart = "Auth";
  if (pathname.includes("/login")) dynamicPart = "Login";
  else if (pathname.includes("/register")) dynamicPart = "Register";

  return {
    title: `SwopMarket | ${dynamicPart}`,
    description: `SwopMarket ${dynamicPart} page.`,
  };
}

export default function AuthGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
