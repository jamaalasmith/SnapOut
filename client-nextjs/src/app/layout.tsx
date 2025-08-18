import type { Metadata } from "next";
import "./globals.css";
import { AntdProvider } from './providers';

export const metadata: Metadata = {
  title: "SnapOut",
  description: "A social media platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AntdProvider>
          {children}
        </AntdProvider>
      </body>
    </html>
  );
}
