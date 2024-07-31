import Image from "next/image";
import SideBar from "@/components/SideBar";
import YourLibrary from "@/components/YourLibrary";
export default function Home() {
  return (
    <div className="h-full p-2">
      <div className="flex flex-col h-full gap-2">
        <SideBar />
        <YourLibrary />
      </div>
      
    </div>
  );
}
