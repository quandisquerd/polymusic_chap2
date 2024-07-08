import BarSong from '../BarSong'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'antd'
import ModelDetail from '../ModelDetail'
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons'


const Song = ({ nameAlbum, data, index, isCurrentPlaying, isPlaying, giaytongs, widthPercentages, startmin, startsec, currentPlayingIndex, ontogglePlay, min, sec, onIndex, onTime , onActive, active}: any) => {
    const onClickid = (id: any) => {
        ontogglePlay(id)
    
    }
    const togglePlay=(index:any)=>{
        onIndex(index)
        onActive(index)
    }
    const handleTimeUpdate=(even : any, name:any, image:any)=>{
        data={even, name, image}
        onTime(data)
    }
    const Index=(index1:any)=>{
        onIndex(index1)
    }
  return (
    <>
          <div className="row align-items-center justify-content-center mb-20" key={index}>
              <div className="col-xl-10">
                  <div className="row align-items-center">
                      <div className="col-xl-9 col-md-9">
                          <div className="music_field">
                              <div className="thumb">
                                  <img src={data.image} alt="" className={isCurrentPlaying && isPlaying ? 'spinning' : ''} style={{
                                      borderRadius: isCurrentPlaying && isPlaying ? "50%" : "0%",
                                      transition: "border-radius 0.3s ease",
                                      width: "250px",
                                      height: "250px",
                                      objectFit: "cover"
                                  }} />

                              </div>
                              <div className="audio_name">
                                  <div className="name">
                                      <h4 style={{ color: 'white' }}>{data.name}</h4>
                                      <p>{nameAlbum}</p>
                                  </div>
                                  <audio id={`audio-${index}`} preload="auto" onTimeUpdate={(event) => handleTimeUpdate(event, data.name, data.image)}>
                                      <source src={data.file} />
                                  </audio>
                                  <hr />
                                  {isCurrentPlaying && isPlaying ? <BarSong /> : ""}
                                  {isCurrentPlaying ? <div className='tong' style={{ width: `${giaytongs}%`, height: '3px', backgroundColor: 'white', marginTop: '30px', position: 'relative', }} >
                                      <div style={{ width: `${widthPercentages}%`, height: '100%', backgroundColor: 'red', marginTop: '30px', position: 'relative', }}><div className="child"
                                          style={{
                                              position: 'absolute', // Để có thể định vị phần tử con theo vị trí tuyệt đối
                                              top: '-5px', // Điều chỉnh vị trí theo y (lên trên)
                                              right: '0', // Điều chỉnh vị trí theo x (phải)
                                              width: '10px', // Độ rộng của chấm đỏ
                                              height: '10px', // Chiều cao của chấm đỏ
                                              backgroundColor: 'bue',
                                              borderRadius: '50%', // Để tạo hình tròn
                                              display: 'none', // Ẩn ban đầu
                                          }}
                                      ></div> </div>
                                  </div> : <div style={{ width: `100%`, height: '3px', backgroundColor: 'white', marginTop: '30px' }}></div>}
                                  {isCurrentPlaying ? (<><span style={{ color: 'white' }}>{startmin} :{startsec}</span>  /</>) : ""} {isCurrentPlaying ? (<><span style={{ color: 'white' }}>{min} :{sec}</span></>) : ""}
                              </div>
                          </div>
                      </div>
                      <div className="col-xl-3 col-md-3">
                          <div className="music_btn">
                              <Button className="boxed-btn" style={{ height: '50px', width: '120px', backgroundColor: currentPlayingIndex === index && isPlaying ? 'red' : 'white' }} onClick={() => togglePlay(index)}>
                                  {isCurrentPlaying && isPlaying ? <FontAwesomeIcon color='white' icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
                              </Button>
                              <h4> </h4>
                              <ModelDetail data={data} index={index} onId={onClickid} isCurrentPlaying={isCurrentPlaying} isPlaying={isPlaying} currentPlayingIndex={currentPlayingIndex} onIndex ={Index}/>
                          </div>
                      </div>
                  </div>
              </div>

          </div>
          <br />
          <br />
          <hr style={{ backgroundColor: 'gray' }} />
          <br />
          <br />
    </>
  )
}

export default Song