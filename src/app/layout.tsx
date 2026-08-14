import type { Metadata } from "next";
import { DM_Mono, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const dmMono = DM_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "Josué Amaral | Full-Stack & DevOps Engineer",
  description: "Portfolio of Josué Amaral, a Python full-stack developer, DevOps engineer and algorithm researcher.",
  metadataBase: new URL("https://josueamaral15.github.io/curriculum-vitae"),
  openGraph: { title: "Josué Amaral | Full-Stack & DevOps Engineer", description: "Software engineering, infrastructure automation and applied algorithms.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={`${manrope.variable} ${dmMono.variable}`}>{children}</body></html>;
}
