import { usePlaylistContext } from "@/context/PlaylistContext";

const handleSet = () => {
    const { playingSong } = usePlaylistContext();
    console.log(playingSong);
} 

export default handleSet;