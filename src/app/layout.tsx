import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mustapha Abdulsalam (Sabeer) - VS Code Portfolio",
  description: "Senior Staff Frontend Engineer, UI Engineer & AI Builder. A pixel-perfect recreation of VS Code built with Next.js, TypeScript, and Tailwind CSS.",
  keywords: ["Mustapha Abdulsalam", "Sabeer", "VS Code Portfolio", "Frontend Developer", "UI Engineer", "React Developer", "Next.js"],
  authors: [{ name: "Mustapha Abdulsalam", url: "https://sabeer-ai.vercel.app" }],
  openGraph: {
    title: "Mustapha Abdulsalam (Sabeer) - VS Code Portfolio",
    description: "Recreation of VS Code workspace built with Next.js & Tailwind CSS.",
    url: "https://sabeer-ai.vercel.app",
    siteName: "Sabeer Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mustapha Abdulsalam (Sabeer) - VS Code Portfolio",
    description: "Recreation of VS Code workspace built with Next.js & Tailwind CSS.",
    creator: "@msabeer",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jetbrainsMono.variable} antialiased font-mono bg-[#1E1E1E] text-[#CCCCCC] select-none`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
