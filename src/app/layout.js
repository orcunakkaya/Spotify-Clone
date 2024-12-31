import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import Navbar from "@/components/navbar/Navbar";
import YourLibrary from "@/components/YourLibrary";
import { PlaylistProvider } from "@/context/PlaylistContext";
import PrewievPlayer from "@/components/PrewievPlayer";

export const metadata = {
  title: "Spotify Clone",
  description: "Listen to music!",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
    <body className={`${inter.className} bg-pageBackgroundColor h-screen overflow-hidden relative max-lg:overflow-auto max-lg:h-full`}>
      <div className="h-full p-2 max-lg:p-0 overflow-hidden max-lg:flex max-lg:flex-col-reverse max-lg:overflow-auto max-lg:h-full">
     
          <Navbar />
          <PlaylistProvider>
            <main className="grid grid-cols-custom-base-layout max-lg:grid-cols-[none] mt-2 min-h-[calc(100vh-72px)] max-lg:m-0 max-h-[calc(100vh-72px)] h-[calc(100vh-72px)] max-lg:h-[calc(100vh-126px)] max-lg:min-h-[calc(100vh-126px)] max-lg:max-h-[calc(100vh-126px)]">
              <div className=" bg-gray-800 p-4 text-white max-h-full max-lg:hidden" >
                <YourLibrary />
              </div>
              
              <div className="bg-boxBackgroundColor m-4 mb-4 max-lg:m-0 rounded-lg max-lg:rounded-none p-4 max-h-full overflow-hidden overflow-y-auto">
              {children}
              </div>
            </main>
            <PrewievPlayer />
          </PlaylistProvider>
        </div>
    </body>
  </html> 
  );
}




{/* <html lang="en">
<body className={`${inter.className} bg-pageBackgroundColor h-screen relative max-lg:overflow-auto max-lg:h-full`}>
  <div className="h-full p-2 max-lg:p-0  max-lg:flex max-lg:flex-col-reverse max-lg:overflow-auto max-lg:h-full">
 
      <Navbar />
      <PlaylistProvider>
        <main className="grid grid-cols-custom-base-layout max-lg:grid-cols-[none] mt-2 max-h-[calc(100vh-92px)] min-h-[calc(100vh-92px)] h-[calc(100vh-92px)]">
          <div className=" bg-gray-800 p-4 text-white max-h-full max-lg:hidden" >
            <YourLibrary />
          </div>
          
          <div className="bg-boxBackgroundColor m-4 mb-4 max-lg:m-0 rounded-lg p-4 max-h-full overflow-hidden overflow-y-auto">
          {children}
          </div>
        </main>
        <PrewievPlayer />
      </PlaylistProvider>
    </div>
</body>
</html>  */}