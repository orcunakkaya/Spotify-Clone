import { getPlaylist } from '@/actions/actions';
import MusicCard from '@/components/MusicCard';
import Time from '../../../../public/assets/Time';
import PlaylistPagesHeader from '@/components/PlaylistPagesHeader/PlaylistPagesHeader';

export const revalidate = 0;

const Home = async ({ params }) => {
    const playList = await getPlaylist({id: params.id});
  
    return (
        <div className='text-white'>
        <PlaylistPagesHeader playlist={
            {
                title: playList?.title ?? '',
                playListImage: playList?.playListImage ?? '',
                playListCount: playList?.songs.length ?? 0,
                hiddenOptions: false,
                uris: playList?.songs.map((music) => music.uri)
            }} 
            />
        <div className='grid items-center h-8 px-4 mb-4 border border-transparent text-subdued gap-x-4 grid-cols-custom-layout max-2xl:grid-cols-custom-layout-md max-xl:grid-cols-custom-layout-sm border-b-hoverBackgroundColor'>
            <span>#</span>
            <div className='text-sm'>Başlık</div>
            <div></div>
            <div className='text-sm max-xl:hidden'>Albüm</div>
            <div className='text-sm max-2xl:hidden'>Eklenme Tarihi</div>
            <div className='relative flex items-center'><div className='absolute left-2'><Time /></div></div>
        </div>
        {
            playList.songs.map((music, index) => (
                <MusicCard key={index} music={music} order={index} />
            ))
        }
    </div>
    )
}

export default Home