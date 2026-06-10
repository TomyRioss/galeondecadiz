import type { Metadata } from "next";
import { Cinzel, Lora } from "next/font/google";
import "./globals.css";
import PublicLayout from "./components/layout/PublicLayout";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Fundación Social Galeona de Cádiz",
  description: "Portal institucional de la Fundación Social Galeona de Cádiz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${cinzel.variable} ${lora.variable} h-full antialiased`}
      style={{ overflowX: "clip" }}
    >
      <body
        className="min-h-full flex flex-col"
        style={{ background: "#F5EDD6", fontFamily: "var(--font-lora, serif)", overflowX: "clip" }}
      >
        <PublicLayout>{children}</PublicLayout>
      </body>
    </html>
  );
}
