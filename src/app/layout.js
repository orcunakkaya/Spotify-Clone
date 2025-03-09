import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import Navbar from "@/components/Navbar";
import YourLibrary from "@/components/YourLibrary";
import { PlaylistProvider } from "@/context/PlaylistContext";
import { PlayerProvider } from "@/context/PlayerContext";
import { AuthProvider } from "@/context/AuthContext";
import Player from "@/components/Player";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata = {
  title: "Spotify Clone",
  description: "Listen to music!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-pageBackgroundColor h-screen overflow-hidden relative max-lg:overflow-auto max-lg:h-full`}
      >
        <AuthProvider>
          <PlaylistProvider>
            <PlayerProvider>
              <div className="h-full p-2 overflow-hidden max-lg:p-0 max-lg:flex max-lg:flex-col-reverse max-lg:overflow-auto max-lg:h-full">
                <Navbar />
                <main className="grid grid-cols-custom-base-layout max-lg:grid-cols-[none] mt-2 min-h-[calc(100vh-168px)] max-lg:m-0 max-h-[calc(100vh-168px)] h-[calc(100vh-168px)] max-lg:h-[calc(100vh-122px)] max-lg:min-h-[calc(100vh-122px)] max-lg:max-h-[calc(100vh-122px)]">
                  <div className="max-h-full p-2 text-white max-lg:hidden">
                    <Suspense fallback={<Loading />}>
                      <YourLibrary />
                    </Suspense>
                  </div>
                  <div className="max-h-full p-2 m-2 overflow-hidden overflow-y-auto rounded-lg bg-boxBackgroundColor max-lg:m-0 max-lg:rounded-none">
                  <Suspense fallback={<Loading />}>
                    {children}
                  </Suspense>
                  </div>
                </main>
                <Player />
              </div>
            </PlayerProvider>
          </PlaylistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}