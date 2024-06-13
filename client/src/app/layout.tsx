import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import AuthProvider from "@/lib/AuthProvider";
import AdSense from "@/components/ui/adsense";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hire-Hub",
  description: "Made by Md.Sadiq",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="system">
      <head>
        <AdSense pId="ca-pub-8144091131283360" />
      </head>
      <body className={inter.className}>
        {" "}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
