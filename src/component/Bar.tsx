import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faFastForward } from '@fortawesome/free-solid-svg-icons';

const Bar = ({ data }: any) => {
    console.log(data);
    const handleFastForward = (increase: any) => {
        const audioElement: any = document.getElementById(`audio-${data?.indexs}`);
        if (increase) {
            let newTime = audioElement.currentTime + 5;
            audioElement.currentTime = newTime;
        } else {
            let newTime = audioElement.currentTime - 5;
            audioElement.currentTime = newTime;
        }
    }
    const [dragging, setDragging] = useState(false);
    const handleMouseDown = () => {
        setDragging(true);
    };
    const handleMouseUp = () => {
        setDragging(false);
    };
    const handleMouseMove = (e: any) => {
        if (!dragging) return;
        const outerDiv: any = document.querySelector('.outer-div');
        const newWidthPercent = (e.clientX - outerDiv.getBoundingClientRect().left) / outerDiv.clientWidth * 100;
        const newtime = Number(data?.giayton * newWidthPercent) / 100
        const audioElement: any = document.getElementById(`audio-${data?.indexs}`);
        audioElement.currentTime = newtime
    };
    return (
        <>
            <div className="progress-bar-container" style={{ width: '100%', margin: '0px auto' }} >
                <div
                    style={{ width: '60%', display: 'flex', float: 'left', margin: '0px 19%' }}
                >
                    <div style={{
                        width: '110px', marginLeft: '20px', marginTop: '24px'
                    }}>
                        <FontAwesomeIcon icon={faFastForward} flip="horizontal" style={{ marginRight: ' 20px', color: 'white', width: '10%' }} onClick={() => handleFastForward(false)} />

                        {data?.isPlaying ? <FontAwesomeIcon color='white' icon={faPause} onClick={() => data?.togglePlay(data?.indexs)} /> : <FontAwesomeIcon color='red' icon={faPlay} onClick={() => data?.togglePlay(data?.indexs)} />}

                        <FontAwesomeIcon icon={faFastForward} style={{ marginLeft: '20px', color: 'white', width: '10%' }} onClick={() => handleFastForward(true)} />
                    </div>
                    <span style={{ color: 'red', marginTop: '27px', width: '40px', fontSize: '12px' }}>{data?.startmin} :{data?.startsec} </span>
                    <div style={{ marginLeft: '15px', width: '60%', marginTop: '5px' }} className='outer' onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}>
                        <div
                            style={{
                                width: `${data?.giaytongs}%`,
                                height: '1px',
                                backgroundColor: 'white',
                                marginTop: '30px',
                                marginBottom: '5px',
                                position: 'relative',
                                transition: 'width 0.2s',
                            }}
                            className="outer-div"
                        >
                            <div
                                style={{
                                    width: `${data?.widthPercentages}%`,
                                    height: '100%',
                                    backgroundColor: 'red',
                                    marginTop: '30px',
                                    position: 'relative',
                                    display: 'flex',
                                    cursor: 'col-resize', // Hiển thị con trỏ khi kéo
                                }}
                                className="inner-div"
                                onMouseDown={handleMouseDown}
                            ></div>
                        </div>
                    </div>
                    <span style={{ marginLeft: '20px', color: 'white', marginTop: '27px', width: '50px', fontSize: '12px' }}>{data?.min} :{data?.sec}</span>
                    <div style={{
                        width: '20%', marginLeft: '20px', marginTop: '25px', color: 'white', display: 'flex'
                    }}>
                        <img width='15%' height='20px' src={data?.imageMusic} alt="" />
                        <span style={{ marginLeft: '5px' }}> </span>
                        <span style={{ fontSize: '12px' }}>{data?.nameMusic}</span>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Bar