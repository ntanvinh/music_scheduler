import player from "sound-play";
import * as fs from "fs";
import * as path from "node:path";
import * as scheduler from "node-schedule";
import { MUSIC_TIMES } from "./constants";
import arrayShuffle from 'array-shuffle';
import { timestamp } from "./utils/MusicUtils";
import { MusicTime } from "./interfaces/interfaces.ts";

function getCurrentTimeInMinutes() {
  return new Date().getHours() * 60 + new Date().getMinutes();
}

async function playPlaylist(musicTime: MusicTime, endTimeInMinutes: number) {
  let playlist = fs.readdirSync(musicTime.playlistPath);
  if (musicTime.shuffle) {
    playlist = arrayShuffle(playlist);
  }

  playlist = [...musicTime.priorSongPaths?.map(song => path.resolve(song)) ?? [], ...playlist.map(song => path.resolve(musicTime.playlistPath, song))];
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
}

async function runMusicScheduler() {

  for (const musicTime of MUSIC_TIMES) {
    const startTimeParts = musicTime.startTime.split(":");
    const startHour = +startTimeParts[0];
    const startMinute = +startTimeParts[1];
    const startTimeInMinutes = startHour * 60 + startMinute;
    const endTimeParts = musicTime.endTime.split(":");
    const endHour = +endTimeParts[0];
    const endMinute = +endTimeParts[1];
    const endTimeInMinutes = endHour * 60 + endMinute;
    const currentTimeInMinutes = getCurrentTimeInMinutes();

    // play immediately if in music time
    if (currentTimeInMinutes > startTimeInMinutes && currentTimeInMinutes < endTimeInMinutes) {
      await playPlaylist(musicTime, endTimeInMinutes);
    }


    console.log("Chay lich bat nhac:", musicTime);
    scheduler.scheduleJob(`${startMinute} ${startHour} * * ${musicTime.weekdays}`, async () => {
      console.log(timestamp(), "Choi danh sach nhac");
      await playPlaylist(musicTime, endTimeInMinutes);
    })
  }
  console.log("De dung chuong trinh vui long an Ctrl+C roi an Y");
}

runMusicScheduler().then();
