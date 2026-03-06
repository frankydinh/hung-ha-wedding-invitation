import type { Metadata } from "next";
import "./globals.css";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://wedding-hung-ha.vercel.app';

export const metadata: Metadata = {
  title: "Thiệp mời cưới Hưng - Hà",
  description: "Trân trọng kính mời quý khách tham dự lễ thành hôn",
  openGraph: {
    title: "Thiệp mời cưới Hưng - Hà",
    description: "Trân trọng kính mời quý khách tham dự lễ thành hôn",
    type: 'website',
    locale: 'vi_VN',
    url: baseUrl,
    siteName: 'Thiệp mời cưới Hưng - Hà',
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Thiệp mời cưới Khánh Hưng - Đinh Hà',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Thiệp mời cưới Hưng - Hà",
    description: "Trân trọng kính mời quý khách tham dự lễ thành hôn",
    images: [`${baseUrl}/og-image.jpg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
