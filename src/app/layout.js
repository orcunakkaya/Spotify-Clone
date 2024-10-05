import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

import Navbar from "@/components/Navbar";
import YourLibrary from "@/components/YourLibrary";

export const metadata = {
  title: "Spotify Clone",
  description: "Listen to music!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-full p-2 bg-pageBackgroundColor">
          <div className="flex flex-col h-full gap-2">
            <Navbar />
            <YourLibrary />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
