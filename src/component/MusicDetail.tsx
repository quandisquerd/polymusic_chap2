import './detail.css'

const MusicDetail = () => {
  return (
    <>
      <div className="soundcloud-player">
        <div className="player-controls">
          <button className="play-button"></button>
          <div className="track-info">
            <span className="track-title">Song Title</span>
            <span className="artist-name">Artist Name</span>
          </div>
        </div>
        <div className="progress-bar">
          <div className="progress"></div>
        </div>
      </div>
    </>
  )
}

export default MusicDetail
