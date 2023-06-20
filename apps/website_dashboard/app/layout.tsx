import { DependencyProvider } from "@/contexts/dependency_provider";
import "tailwind-config/globals.css";
import { Nunito_Sans } from "next/font/google";
// import { Noto_Sans } from "next/font/google";
import { Toaster } from "ui";
import ReduxContextProvider from "@/redux/reduprovider/redux_context_provider";
import { Metadata } from "next";
import { siteConfig } from "@/config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.siteName,
    template: "%s | " + siteConfig.siteName,
  },

  description: siteConfig.description,
  keywords: ["Church", "Religious organization", "Automated Church"],
  authors: [
    {
      name: "otieno_otieno",
      url: "https://ocluse.com",
    },
  ],
  creator: "otieno_otieno",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.siteName,
    description: siteConfig.description,
    siteName: siteConfig.siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.siteName,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: "@lewynation29",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  // manifest: `${siteConfig.url}/site.webmanifest`,
};

const oswald = Nunito_Sans({
  subsets: ["latin"],
  variable: "--oswald",
  weight: ["200", "200", "400", "300", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ReduxContextProvider>
        <DependencyProvider>
          <body className={oswald.variable}>
            {children}
            <Toaster />
          </body>
        </DependencyProvider>
      </ReduxContextProvider>
    </html>
  );
}
