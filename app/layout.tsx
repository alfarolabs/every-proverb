import type { Metadata, Viewport } from "next";
import { catalog } from "@/lib/catalog";
import { utcDay } from "@/lib/day";
import { proverbForDay } from "@/lib/proverb";
import { site } from "@/lib/site";
import "./globals.css";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const daily = proverbForDay({ day: utcDay(new Date()), catalog });
  const title = `${site.name} · ${daily.proverb.text}`;
  const description = daily.proverb.text;

  return {
    metadataBase: new URL(site.origin),
    title,
    description,
    alternates: { canonical: "/" },
    openGraph: {
      title: daily.proverb.text,
      description,
      url: site.origin,
      siteName: site.name,
      type: "website",
      locale: "en_US",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#f5efe4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-paper font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
