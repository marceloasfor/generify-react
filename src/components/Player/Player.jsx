import React, { useRef, useState, useEffect } from "react";
import PlayerControls from "./PlayerControls";
import ReactAudioPlayer from 'react-audio-player';


const Player = (props) => {

    const audioElement = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);


    useEffect(() => {
        if (isPlaying) {
            audioElement.current.audioEl.current.play();
        } else {
            audioElement.current.audioEl.current.pause();
        }
    });

    const SkipSong = (forwards = true) => {
        if (forwards) {
            props.setCurrentSongIndex(() => {
                let temp = props.currentSongIndex;
                temp++;

                if (temp > props.songs.length - 1) {
                    temp = 0;
                }
                return temp;
            });
        } else {
            props.setCurrentSongIndex(() => {
                let temp = props.currentSongIndex;
                temp--;

                if (temp < 0) {
                    temp = props.songs.length - 1;
                }
                return temp;
            });
        }
    };

    return (
        <div className="player">
            <ReactAudioPlayer src={props.songs[props.currentSongIndex]?.file} ref={audioElement} />
            <PlayerControls isPlaying={isPlaying} setIsPlaying={setIsPlaying} SkipSong={SkipSong} />
        </div>
    );
};

export default Player;