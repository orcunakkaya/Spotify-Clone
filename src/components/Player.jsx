"use client";
import React, { useState, useEffect } from "react";
import RandomPlay from "../../public/assets/music-player/RandomPlay";
import ArrowLeft from "../../public/assets/music-player/ArrowLeft";
import ArrowRight from "../../public/assets/music-player/ArrowRight";
import Replay from "../../public/assets/music-player/Replay";
import Voice from "../../public/assets/music-player/Voice";
import Image from "next/image";
import Play from "../../public/assets/Play";
import { usePlayerContext } from "@/context/PlayerContext";
import { useAuthContext } from "@/context/AuthContext";
import Stop from "../../public/assets/music-player/Stop";

const Player = () => {
  const {
    isPlaying,
    setIsPlaying,
    setCurrentTrack,
    currentTrack,
    allTracks,
    playSong,
  } = usePlayerContext();
  const { player, deviceId, auth } = useAuthContext();

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState(0.5);

  const handleSeek = (event) => {
    const newTime = event.target.value;
    setCurrentTime(newTime);
    if (player) {
      player.seek(newTime * 1000);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handlePlayPause = () => {
    player.togglePlay();

    setIsPlaying((prev) => !prev);
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
    if (player) {
      player.setVolume(e.target.value);
    }
  };

  useEffect(() => {
    let interval;

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime + 1 < duration) {
            return prevTime + 1;
          } else {
            clearInterval(interval);
            setIsPlaying(false);
            return duration;
          }
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  useEffect(() => {
    if (player) {
      player.addListener(
        "player_state_changed",
        ({ position, duration, paused, track_window: { current_track } }) => {
          setCurrentTrack(current_track);
          setCurrentTime(position / 1000);
          setDuration(duration / 1000);
          if (position === 0 && paused) {
            setIsPlaying(false);
          }
          console.log("player_state_changed", current_track);
        }
      );
    }
  }, [player]);

  useEffect(() => {
    if (player) {
      player.setVolume(volume);
    }
  }, [volume, player]);

  const nextTrack = () => {
    if (!allTracks || allTracks.length === 0) return;
    const currentIndex = allTracks.findIndex(
      (track) => track === currentTrack.uri
    );
    if (currentIndex === allTracks.length - 1) return;
    const nextTrack = allTracks[currentIndex + 1];
    playSong([nextTrack], auth, deviceId);
  };
  const prevTrack = () => {
    if (!allTracks || allTracks.length === 0) return;
    const currentIndex = allTracks.findIndex(
      (track) => track === currentTrack.uri
    );
    if (currentIndex === 0) return;
    const prevTrack = allTracks[currentIndex - 1];
    playSong([prevTrack], auth, deviceId);
  };
  return (
    <>
      <div className="max-lg:hidden max-lg:fixed max-lg:bottom-[66px] h-[72px] max-lg:h-[56px] text-white bg-black mx-2 grid self-center max-lg:w-full max-lg:px-2 max-lg:mx-0">
        <div className="flex items-center justify-between m-0">
          <div className="grid grid-flow-col gap-2 w-[245px] grid-cols-[auto_1fr]">
            <div className="border-none rounded bg-decorativeSubdued w-[56px] h-[56px] max-xl:w-[56px] max-xl:h-[56px] shadow-emptyBox relative grid place-items-center">
              {currentTrack ? (
                <Image
                  src={currentTrack.album.images[0].url}
                  alt={currentTrack.name}
                  width={56}
                  height={56}
                  priority
                  className="rounded"
                />
              ) : (
                <Image
                  src={"/assets/empty.svg"}
                  alt={"empty music"}
                  width={20}
                  height={20}
                  priority
                  className="rounded"
                />
              )}
            </div>
            <div className="grid">
              <span className="text-ellipsis line-clamp-1 whitespace-nowrap">
                {currentTrack ? currentTrack.name : ""}
              </span>
              <span className="text-xs whitespace-nowrap text-subdued text-ellipsis line-clamp-1">
                {currentTrack
                  ? currentTrack.artists.map((i) => i.name).join(", ")
                  : ""}
              </span>
            </div>
          </div>

          <div className="w-[35%] grid gap-2">
            <div className="flex items-center gap-4 whitespace-nowrap place-self-center">
              <span className="cursor-pointer text-subdued">
                <RandomPlay />
              </span>
              <button
                disabled={!currentTrack}
                onClick={() => prevTrack()}
                className="cursor-pointer text-subdued"
              >
                <ArrowLeft />
              </button>
              <button
                disabled={!currentTrack}
                onClick={handlePlayPause}
                className="grid w-8 h-8 text-black bg-white rounded-full cursor-pointer place-items-center"
              >
                {isPlaying ? <Stop /> : <Play />}
              </button>
              <button
                disabled={!currentTrack}
                onClick={() => nextTrack()}
                className="cursor-pointer text-subdued"
              >
                <ArrowRight />
              </button>
              <span className="cursor-pointer text-subdued">
                <Replay />
              </span>
            </div>
            <div className="flex items-center gap-4 whitespace-nowrap">
              <span className="w-16 text-xs text-right text-subdued">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-gray-700 rounded-full appearance-none cursor-pointer range-thumb-transparent range-track-green"
                style={{
                  "--value": currentTime,
                  "--max": duration,
                }}
              />
              <span className="text-xs text-subdued">
                {formatTime(duration)}
              </span>
            </div>
          </div>
          <div className="flex items-center w-32 gap-2 whitespace-nowrap">
            <span className="text-subdued">
              <Voice />
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-1 bg-gray-700 rounded-full appearance-none cursor-pointer range-thumb-transparent range-track-green"
              style={{
                "--value": volume,
                "--max": 1,
              }}
            />
          </div>
        </div>
      </div>
      <div>
      <div className="hidden max-lg:fixed max-lg:bottom-[66px] h-[72px] max-lg:h-[56px] text-white bg-black mx-2 max-lg:grid self-center max-lg:w-full max-lg:px-2 max-lg:mx-0">
        <div className="grid px-1">
        <div className="flex items-center justify-between m-0">
          <div className="grid grid-flow-col gap-2 w-[245px] grid-cols-[auto_1fr]">
            <div className="border-none rounded bg-decorativeSubdued w-[40px] h-[40px] shadow-emptyBox relative grid place-items-center">
              {currentTrack ? (
                <Image
                  src={currentTrack.album.images[0].url}
                  alt={currentTrack.name}
                  width={40}
                  height={40}
                  priority
                  className="rounded"
                />
              ) : (
                <Image
                  src={"/assets/empty.svg"}
                  alt={"empty music"}
                  width={20}
                  height={20}
                  priority
                  className="rounded"
                />
              )}
            </div>
            <div className="grid">
              <span className="text-xs text-ellipsis line-clamp-1 whitespace-nowrap">
                {currentTrack ? currentTrack.name : ""}
              </span>
              <span className="text-xs text-subdued text-ellipsis line-clamp-1 whitespace-nowrap">
                {currentTrack
                  ? currentTrack.artists.map((i) => i.name).join(", ")
                  : ""}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 whitespace-nowrap place-self-center">
              <button
                disabled={!currentTrack}
                onClick={handlePlayPause}
                className="grid w-8 h-8 text-white cursor-pointer place-items-center"
              >
                {isPlaying ? <Stop /> : <Play />}
              </button>
            </div>
        </div>
        <div className="flex items-center gap-4 whitespace-nowrap">
              <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-gray-700 rounded-full appearance-none cursor-pointer range-thumb-transparent range-track-green"
                style={{
                  "--value": currentTime,
                  "--max": duration,
                }}
              />
            </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Player;
