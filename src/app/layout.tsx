import type { Metadata } from "next";
import { Inter, Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DeepCurrent — Accountable AI for Enterprises",
  description:
    "We help enterprises design and deploy safe, reliable, and transparent AI systems.",
  metadataBase: new URL("https://deepcurrent.example"),
  openGraph: {
    title: "DeepCurrent — Accountable AI for Enterprises",
    description:
      "We help enterprises design and deploy safe, reliable, and transparent AI systems.",
    url: "https://deepcurrent.example",
    siteName: "DeepCurrent",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "DeepCurrent — Accountable AI for Enterprises",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DeepCurrent — Accountable AI for Enterprises",
    description:
      "We help enterprises design and deploy safe, reliable, and transparent AI systems.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistMono.variable} ${manrope.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
