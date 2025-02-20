import React, { useRef, useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faCirclePause ,faBackwardStep, faForwardStep } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, "0");
    const seconds = Math.floor(timeInSeconds - minutes * 60).toString().padStart(2, "0");

    return `${minutes}:${seconds}`
};

const timeInSecond = (timeString) => {
    const splitArray = timeString.split(':');
    const minutes = Number(splitArray[0]);
    const seconds = Number(splitArray[1]);

    return seconds + minutes * 60;
};

const Player = ({songDuration, randomIdFromArtist, randomIdFromArtist2, audio}) => {
    const audioPlayer = useRef();
    const progressBar = useRef();
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(formatTime(0));
    const durantionInSeconds = timeInSecond(songDuration);

    console.log(durantionInSeconds);

    const playPause = () => {
        isPlaying ? audioPlayer.current.pause() : audioPlayer.current.play();

        setIsPlaying(!isPlaying);

        setCurrentTime(formatTime(audioPlayer.current.currentTime));

        console.log(formatTime(audioPlayer.current.currentTime));
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (isPlaying)
                setCurrentTime(formatTime(audioPlayer.current.currentTime));

            progressBar.current.style.setProperty("--_progress", (audioPlayer.current.currentTime / durantionInSeconds) * 100 + "%")
        }, 1000);

        return () => clearInterval(intervalId)
    }, [isPlaying])

    return (
        <div className='player'>
            <div className='player__controllers'>
                <Link to={`/song/${randomIdFromArtist}`}>
                    <FontAwesomeIcon className="player__icon" icon={faBackwardStep} />
                </Link>

                <FontAwesomeIcon  onClick={() => playPause()} className="player__icon player__icon--play" icon={isPlaying ? faCirclePause : faCirclePlay} />

                <Link to={`/song/${randomIdFromArtist2}`}>
                    <FontAwesomeIcon className="player__icon" icon={faForwardStep} />
                </Link>
            </div>

            <div className='player__progress'>
                <p>{currentTime}</p>
                <div className='player__bar'>
                    <div ref={progressBar} className='player__bar-progress'></div>
                </div>
                <p>{`0${songDuration}`}</p>
            </div>

            <audio ref={audioPlayer} src={audio}></audio>
        </div>
    )
}

export default Player