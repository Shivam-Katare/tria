import type React from "react";
import type { Metadata } from "next";
import { Inter, Henny_Penny, Crimson_Text, Outfit } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const henny = Henny_Penny({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-henny",
});

const crimson = Crimson_Text({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-crimson",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Tria — AI Email Triage",
  description:
    "Stop drowning in emails. Tria uses AI to triage your inbox in 10 minutes.",
  generator: "tria",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.className} ${henny.variable} ${crimson.variable} font-sans antialiased`}
      >
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={false}
          >
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
