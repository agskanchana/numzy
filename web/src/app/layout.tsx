import type { Metadata } from "next";
import {
  Fredoka,
  Nunito,
  Noto_Sans_Sinhala,
  Noto_Sans_Tamil,
} from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/i18n";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const sinhala = Noto_Sans_Sinhala({
  variable: "--font-sinhala",
  subsets: ["sinhala"],
});

const tamil = Noto_Sans_Tamil({
  variable: "--font-tamil",
  subsets: ["tamil"],
});

export const metadata: Metadata = {
  title: "Numzy — Practice that's personal. Progress that's visible.",
  description:
    "Maths practice for Sri Lankan kids (ages 5–12). Sinhala, Tamil and English. Aligned to the local syllabus with a Grade 5 Scholarship mode.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${nunito.variable} ${sinhala.variable} ${tamil.variable} h-full antialiased`}
    >
      {/* suppressHydrationWarning: browser extensions (ad-block/antivirus)
          inject attributes into <body> before React hydrates; only this
          element's attribute mismatches are ignored, children are checked. */}
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
