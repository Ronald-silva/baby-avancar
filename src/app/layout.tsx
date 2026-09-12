import type { Metadata } from "next";
import { Fraunces, Nunito_Sans } from "next/font/google";
import { cn } from "@/shared/lib/cn";
import "./globals.css";

const fraunces = Fraunces({
  display: "swap",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
});

const nunitoSans = Nunito_Sans({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Colégio Baby Avançar",
  description: "Educação infantil acolhedora e desenvolvimento integral.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={cn(fraunces.variable, nunitoSans.variable)} lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
