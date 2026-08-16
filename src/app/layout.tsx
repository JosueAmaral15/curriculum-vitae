import type { Metadata } from "next";
import { DM_Mono, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const dmMono = DM_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500"] });
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://josueamaral15.github.io/curriculum-vitae";
const socialImage = new URL(`${basePath}/og-portfolio.png`, new URL(siteUrl).origin).toString();

export const metadata: Metadata = {
  title: "Josué Amaral | Full-Stack & DevOps Engineer",
  description: "Portfolio of Josué Amaral, a Python full-stack developer, DevOps engineer and algorithm researcher.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  icons: { icon: `${basePath}/favicon.svg` },
  openGraph: {
    title: "Josué Amaral | Full-Stack & DevOps Engineer",
    description: "Software engineering, infrastructure automation and applied algorithms.",
    images: [{ url: socialImage, width: 1731, height: 909, alt: "Josué Amaral professional portfolio" }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Josué Amaral | Full-Stack & DevOps Engineer", description: "Software engineering, infrastructure automation and applied algorithms.", images: [socialImage] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${manrope.variable} ${dmMono.variable}`}>{children}</body></html>;
}
