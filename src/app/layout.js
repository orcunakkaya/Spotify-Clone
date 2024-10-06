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
        <div className="h-screen p-2 bg-pageBackgroundColor overflow-auto">
       
            <Navbar />
            <main className="flex flex-col md:flex-row mt-2 min-h-[calc(100vh-72px)]">
              <div className="w-full md:w-1/4 lg:w-1/5 bg-gray-800 p-4 text-white max-h-full overflow-y-auto" >
                <YourLibrary />
              </div>
              
              <div className="flex-1 max-h-full m-4">
              <div className="bg-boxBackgroundColor mb-8 rounded-lg p-4 h-full">
              {children}
              </div>
              </div>
            </main>
          </div>
     
      </body>
    </html> 
  );
}


{/* <html lang="en">
      <body className={`${inter.className} h-full overflow-hidden`}>
        <div className="h-full p-2 bg-pageBackgroundColor overflow-auto">
       
            <Navbar />
            <main className="flex flex-col md:flex-row mt-2 h-[calc(100vh-64px)]">
              <div className="w-full md:w-1/4 lg:w-1/5 bg-gray-800 p-4 text-white h-full overflow-y-auto" >
                <YourLibrary />
              </div>
              
              <div className=" flex-1 h-fit bg-white m-4 rounded-lg p-4">
              {children}
              </div>
            </main>
          </div>
     
      </body>
    </html> */}