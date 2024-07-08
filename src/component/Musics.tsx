
import { useGetMusicQuery } from '../api/music';
import 'plyr/dist/plyr.css';
import './css/bootstrap.min.css'
import './css/owl.carousel.min.css'
import './css/magnific-popup.css'
import "./css/font-awesome.min.css"
import "./css/themify-icons.css"
import "./css/audioplayer.css"
import "./css/flaticon.css"
import "./css/gijgo.css"
import "./css/animate.css"
import "./css/slick.css"
import "./css/slicknav.css"
import "./css/style.css"
import './music.css'
import { useEffect, useState } from 'react';
import Bar from './Bar';
import { useGetAlbumQuery } from '../api/album';
import Song from './SongInListMusic/Song';
const Musics = () => {
    const { data, isLoading } = useGetMusicQuery('')
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPlayingIndex, setCurrentPlayingIndex]: any = useState(null); // State lưu index bài hát đang chạy
    const [widthPercentages, setWidthPercentages] = useState<any>()
    const [giaytongs, setgiaytong] = useState(0)
    const [sec, setsec] = useState(0)
    const [min, setmin] = useState(0)
    const [startsec, setstartsec] = useState(0)
    const [startmin, setstartmin] = useState(0)
    const [nameMusic, setnameMusic] = useState('')
    const [imageMusic, setimageMusic] = useState('')
    const [indexs, setindex] = useState(0)
    const [datas, setdatas] = useState([])
    const [isBarVisible, setIsBarVisible] = useState(false);
    const [active, setactive] = useState<any>()
    // Hàm để bắt đầu phát bài hát
    const playNextTrack = () => {
        const nextIndex = currentPlayingIndex + 1;
        if (nextIndex < data?.data?.length) {
            togglePlay(nextIndex);
        }
    };
    useEffect(() => {
        const audioElement: any = document.getElementById(`audio-${currentPlayingIndex}`);
        if (audioElement) {
            audioElement.addEventListener('ended', playNextTrack);
            return () => {
                audioElement.removeEventListener('ended', playNextTrack);
            };
        }
    }, [currentPlayingIndex]);
    const togglePlay = (index: any) => {
        setindex(index)
        if (index === currentPlayingIndex) {
            // Kiểm tra xem bài hát đang phát đã hoàn thành hay chưa
            const audioElement: any = document.getElementById(`audio-${index}`);
            if (audioElement && audioElement.currentTime === audioElement.duration) {
                audioElement.currentTime = 0; // Quay lại thời gian 0 nếu bài hát đã kết thúc
            }
            setIsPlaying(!isPlaying); // Đảo ngược trạng thái phát/dừng
        } else {
            if (currentPlayingIndex !== null) {
                const audioElement: any = document.getElementById(`audio-${currentPlayingIndex}`);
                if (audioElement) {
                    audioElement.pause(); // Dừng bài hát đang chạy trước khi phát bài mới
                    audioElement.currentTime = 0;
                }
            }
            setCurrentPlayingIndex(index);
            setIsPlaying(true); // Phát bài hát mới
        }
        const audioElement: any = document.getElementById(`audio-${index}`);
        if (audioElement) {
            if (isPlaying && index === currentPlayingIndex) {
                audioElement.pause(); // Dừng âm thanh
            } else {
                audioElement.play(); // Phát âm thanh
            }
        }
    };
    const [giayton, setgiaystong] = useState(0)
    const handleTimeUpdate = (event: any, name: any, image: any) => {
        setnameMusic(name);
        setimageMusic(image)
        const audioElement = event.target;
        const currentTime = audioElement.currentTime;
        const duration = audioElement.duration;
        const s = Math.floor(duration % 60)
        setsec(s);
        const m = Math.floor(duration / 60)
        setmin(m);
        const giay = Math.floor(currentTime);
        let giays = Math.floor(currentTime % 60);
        let phut = Math.floor(currentTime / 60);
        if (giays > 60) {
            giays = 0;
            phut += 1;
            console.log(giays, phut);
            setstartsec(giays)
            setstartmin(phut)
        } else {
            setstartsec(giays)
            setstartmin(phut)
        }
        const giaytong = Math.ceil(duration);
        const widthPercentage = parseFloat((giay / giaytong * 100).toFixed(1));
        const phanTram = Number(giaytong / giaytong) * 100;
        setWidthPercentages(widthPercentage);
        setgiaytong(phanTram)
        setgiaystong(giaytong);
        const data: any = {
            nameMusic: nameMusic, imageMusic: imageMusic, min: min, sec: sec, widthPercentages: widthPercentages, giaytongs: giaytongs, startmin: startmin, startsec: startsec, indexs: indexs, giayton: giayton, isPlaying: isPlaying, togglePlay: togglePlay
        }
        setdatas(data)
        setIsBarVisible(true);
    }
    const { data: album } = useGetAlbumQuery(0)
    const tong = (id: any) => {
        togglePlay(id)
    }
    const Index = (index: any) => {
        togglePlay(index)
    }
    const time = (data1: any) => {
        handleTimeUpdate(data1.even, data1.name, data1.image)
    }
    const actives = (id: any) => {
        setactive(id)
    }
    return (
        <>
            <div className={`music_area music_gallery ${isPlaying ? 'blinking-background' : ''}`}
                style={isPlaying ? {} : { 'background': 'rgb(29,29,40)' }}
            >
                <div className={`container music_area music_gallery ${isPlaying ? 'blinking-background' : ''}`} style={{ backgroundColor: 'black', marginBottom: '60px', borderRadius: '7px' }}>
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="section_title text-center mb-65">
                                <h3 style={{ color: 'white', paddingTop: '40px' }}>Latest Tracks</h3>
                            </div>
                        </div>
                    </div>
                    {isLoading ? (<><div className="loader">
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                        <div className="bar4"></div>
                        <div className="bar5"></div>
                        <div className="bar6"></div>
                        <div className="bar7"></div>
                        <div className="bar8"></div>
                        <div className="bar9"></div>
                        <div className="bar10"></div>
                        <div className="bar11"></div>
                        <div className="bar12"></div>
                    </div>
                        <h1 style={{ paddingTop: '500px' }}></h1></>) : (data?.data?.map((data: any, index: any) => {
                            const isCurrentPlaying = index === currentPlayingIndex;
                            const nameAlbum = album?.data?.find((cat: any) => cat?.id === data?.album_id)?.name
                            return (
                                <>
                                    <Song nameAlbum={nameAlbum} data={data} index={index} isCurrentPlaying={isCurrentPlaying} isPlaying={isPlaying} giaytongs={giaytongs} widthPercentages={widthPercentages} currentPlayingIndex={currentPlayingIndex} ontogglePlay={tong} startmin={startmin} startsec={startsec} min={min} sec={sec} onIndex={Index} onTime={time} onActive={actives} active={active}/>
                                </>
                            )
                        }))}
                </div>
            </div>
            {(isPlaying || isBarVisible) && <Bar data={datas} />}
        </>
    )
}

export default Musics