// import YourLibrary from "@/components/YourLibrary";
import dynamic from "next/dynamic";
const YourLibrary = dynamic(() => import("@/components/YourLibrary"), { ssr: false });
const Home = () => {
  return (
    <div className="text-white">
      <YourLibrary />
    </div>
    
  );
};

export default Home;