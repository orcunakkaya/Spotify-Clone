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
      <body className={`${inter.className} h-screen overflow-hidden relative`}>
        <div className="h-screen p-2 bg-pageBackgroundColor overflow-hidden">
       
            <Navbar />
            <main className="grid grid-cols-custom-base-layout mt-2 min-h-[calc(100vh-72px)] max-h-[calc(100vh-72px)] h-[calc(100vh-72px)]">
              <div className=" bg-gray-800 p-4 text-white max-h-full" >
                <YourLibrary />
              </div>
              
              <div className="bg-boxBackgroundColor m-4 mb-4 rounded-lg p-4 max-h-full overflow-hidden overflow-y-auto">
              {children}
              </div>
            </main>
          </div>
      </body>
    </html> 
  );
}


{/* <html lang="en">
      <body className={`${inter.className} h-screen overflow-hidden relative`}>
        <div className="h-screen p-2 bg-pageBackgroundColor overflow-hidden">
       
            <Navbar />
            <main className="flex flex-col md:flex-row mt-2 min-h-[calc(100vh-72px)] max-h-[calc(100vh-72px)]">
              <div className="w-full md:w-1/4 lg:w-1/5 bg-gray-800 p-4 text-white max-h-full" >
                <YourLibrary />
              </div>
              
              <div className="w-full max-h-full m-4  ">
              <div className="bg-boxBackgroundColor mb-8 rounded-lg p-4 max-h-full h-full overflow-auto">
              {children}
              </div>
              </div>
            </main>
          </div>
     
      </body>
    </html>  */}