import type { Metadata } from "next";
import { Inter, Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@/components/layout";
import SmoothScroller from "@/components/common/SmoothScroller";
import Preloader from "@/components/common/Preloader";
import CustomCursor from "@/components/common/CustomCursor";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-head",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://triversevision.com'), // Replace with actual domain when deployed
  title: "Triverse Vision | Premium Video & Personal Branding Agency",
  description: "Triverse Vision crafts cinematic reels, brand films, and social content that transforms founders into global authorities.",
  keywords: ["Cinematic Reels", "Brand Films", "Personal Branding", "Content Creation Agency", "Video Production", "Social Media Management"],
  authors: [{ name: "Triverse Vision" }],
  creator: "Triverse Vision",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://triversevision.com",
    title: "Triverse Vision | Premium Video & Personal Branding Agency",
    description: "Triverse Vision crafts cinematic reels, brand films, and social content that transforms founders into global authorities.",
    siteName: "Triverse Vision",
    images: [
      {
        url: "/assets/sampleimage.png", // Replace with an actual OG image later
        width: 1200,
        height: 630,
        alt: "Triverse Vision Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Triverse Vision | Premium Video & Personal Branding Agency",
    description: "Triverse Vision crafts cinematic reels, brand films, and social content that transforms founders into global authorities.",
    images: ["/assets/sampleimage.png"], // Replace with an actual OG image later
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          window.onerror = function(message, source, lineno, colno, error) {
            var div = document.createElement('div');
            div.id = 'debug-error-overlay';
            div.style.position = 'fixed';
            div.style.bottom = '0';
            div.style.left = '0';
            div.style.right = '0';
            div.style.background = 'red';
            div.style.color = 'white';
            div.style.padding = '15px';
            div.style.zIndex = '999999';
            div.style.fontSize = '12px';
            div.style.fontFamily = 'monospace';
            div.style.maxHeight = '200px';
            div.style.overflow = 'auto';
            div.innerText = 'Error: ' + message + '\\nAt: ' + source + ':' + lineno + ':' + colno + '\\nStack: ' + (error ? error.stack : 'none');
            document.documentElement.appendChild(div);
          };
          window.addEventListener('unhandledrejection', function(event) {
            var div = document.createElement('div');
            div.id = 'debug-rejection-overlay';
            div.style.position = 'fixed';
            div.style.bottom = '0';
            div.style.left = '0';
            div.style.right = '0';
            div.style.background = 'orange';
            div.style.color = 'white';
            div.style.padding = '15px';
            div.style.zIndex = '999999';
            div.style.fontSize = '12px';
            div.style.fontFamily = 'monospace';
            div.style.maxHeight = '200px';
            div.style.overflow = 'auto';
            div.innerText = 'Unhandled Promise Rejection: ' + event.reason;
            document.documentElement.appendChild(div);
          });
        ` }} />
      </head>
      <body className={`${inter.variable} ${poppins.variable} ${playfair.variable} antialiased`} suppressHydrationWarning>
        {/* Preloader & Cursor outside of SmoothScroller */}
        <Preloader />
        <CustomCursor />
        
        <SmoothScroller>
          <Navbar />
          {children}
          <Footer />
        </SmoothScroller>
      </body>
    </html>
  );
}
