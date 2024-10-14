import { MusicTime } from "../interfaces/interfaces.ts";
import fs from "fs";
import path from "node:path";
import { getCurrentTimeInMinutes, timestamp } from "./DateUtils.ts";
import player from "sound-play";
import { arrayShuffle } from "./ArrayUtils.ts";

let IS_PLAYING_PLAYLIST = false;

export async function playPlaylist(musicTime: MusicTime, endTimeInMinutes: number) {
  IS_PLAYING_PLAYLIST = true;
  let playlist = fs.readdirSync(musicTime.playlistPath);
  if (musicTime.shuffle) {
    playlist = arrayShuffle(playlist);
  }

  playlist = [...musicTime.priorSongPaths?.map(song => path.resolve(song)) ?? [],
    ...playlist
      .filter(song => song.toLowerCase().includes("mp3"))
      .map(song => path.resolve(musicTime.playlistPath, song))];
  let currentTimeInMinutes = getCurrentTimeInMinutes();

  while (currentTimeInMinutes < endTimeInMinutes) {
    for (const song of playlist) {
      console.log(timestamp(), "Dang bat bai hat", song);
      await player.play(song, 1).then();
      console.log(timestamp(), "Ket thuc bai hat", song);

      currentTimeInMinutes = getCurrentTimeInMinutes();
      if (currentTimeInMinutes > endTimeInMinutes) {
        console.log(new Date().toISOString(), "Dung danh sach nhac");
        break;
      }
    }
  }
  IS_PLAYING_PLAYLIST = false;
}

export function isPlayingPlaylist() {
  return IS_PLAYING_PLAYLIST;
}
