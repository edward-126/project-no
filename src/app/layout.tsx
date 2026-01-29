import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Nanum_Pen_Script } from "next/font/google";
import "./globals.css";

export const nanumPenScript = Nanum_Pen_Script({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Project No — Home",
  description:
    "Project No is a tiny Next.js app that fetches a random “nope” reason and generates a random avatar.",
  keywords: [
    "Project No",
    "Next.js",
    "TypeScript",
    "TailwindCSS",
    "shadcn/ui",
    "DiceBear",
    "No as a Service",
  ],
  authors: [
    { name: "Thilina Rathnayaka (Edward Hyde)", url: "https://thilina.dev" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("relative h-full antialiased", nanumPenScript.className)}
      >
        <main className="relative flex min-h-screen flex-col">
          <div className="flex-1 grow">{children}</div>
        </main>
      </body>
    </html>
  );
}
