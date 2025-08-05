import type { Metadata } from "next";
import { Monoton, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import CustomCursor from "../components/ui/CustomCursor";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const monoton = Monoton({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "DevSankalp Portfolio",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${monoton.variable} antialiased min-h-screen bg-black text-white overflow-x-hidden`}
      >
        <CustomCursor />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
