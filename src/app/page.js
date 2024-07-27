import Image from "next/image";
import SideBar from "@/components/SideBar";
import YourLibrary from "@/components/YourLibrary";
export default function Home() {
  return (
    <div>
      <SideBar />
      <YourLibrary />
    </div>
  );
}
