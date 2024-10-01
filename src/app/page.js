import Image from "next/image";
import SideBar from "@/components/SideBar";
import YourLibrary from "@/components/YourLibrary";
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <div className="h-full p-2 bg-pageBackgroundColor">
      <div className="flex flex-col h-full gap-2">
        <Navbar />
        {/* <SideBar /> */}
        <YourLibrary />
      </div>
      
    </div>
  );
}
