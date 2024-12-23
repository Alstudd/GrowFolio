import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GrowFolio 🔥!",
  description: "GrowFolio is a platform for developing your portfolio of financial knowledge.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "antialiased min-h-screen")}>
        <Providers>
          <div className="bg-white dark:bg-black text-black dark:text-white">
          <Navbar />
          {children}
          <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}
