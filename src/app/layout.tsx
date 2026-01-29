import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Nanum_Pen_Script } from "next/font/google";
import "./globals.css";

export const nanumPenScript = Nanum_Pen_Script({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Template-NEXT",
  description:
    "A clean Next.js template with TypeScript, TailwindCSS, Shadcn/ui, and Prettier, developed by Thilina Rathnayaka (A.K.A Edward Hyde). Optimized for quick project setup with handy packages.",
  keywords: ["Next.js", "TypeScript", "TailwindCSS", "Shadcn/ui", "Template"],
  authors: [{ name: "Thilina R. (Edward Hyde)", url: "https://thilina.dev" }],
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
