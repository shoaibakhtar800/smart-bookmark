import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/lib/react-query/provider";
import { Toaster } from "@/components/ui/sonner";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
});

export const metadata: Metadata = {
  title: "Smart Bookmark",
  description: "A smart bookmark manager with realtime sync",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${ubuntu.variable} font-sans antialiased`}>
        <ReactQueryProvider>
          {children}
          <Toaster position="bottom-right" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
