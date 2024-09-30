import player from "sound-play";
import fs from "fs";
import * as path from "node:path";
import scheduler from "node-schedule";
import { MUSIC_TIMES } from "./constants";

function runMusicScheduler() {

  for (const musicTime of MUSIC_TIMES) {
    const startTimeParts = musicTime.startTime.split(":");
    const startHour = startTimeParts[0];
    const startMinute = startTimeParts[1];
    const endTimeParts = musicTime.endTime.split(":");
    const endHour = +endTimeParts[0];
    const endMinute = +endTimeParts[1];
    const endTimeInMinutes = endHour * 60 + endMinute;

    console.log("Chay lich bat nhac:", musicTime);
    scheduler.scheduleJob(`${startMinute} ${startHour} * * ${musicTime.weekdays}`, async () => {
      console.log("Choi danh sach nhac");
      let playlist = fs.readdirSync(musicTime.playlistPath)
      playlist = [...musicTime.priorSongPaths?.map(song => path.resolve(song)) ?? [], ...playlist.map(song => path.resolve(musicTime.playlistPath, song))];
      let currentTimeInMinutes = new Date().getHours() * 60 + new Date().getMinutes();

      while (currentTimeInMinutes < endTimeInMinutes) {
        for (const song of playlist) {
          console.log("Dang bat bai hat", song);
          await player.play(song, 1).then();

          currentTimeInMinutes = new Date().getHours() * 60 + new Date().getMinutes();
          if (currentTimeInMinutes > endTimeInMinutes) {
            console.log("Dung danh sach nhac");
            break;
          }
        }
      }
    })
  }
}

runMusicScheduler();
console.log("De dung chuong trinh vui long an Ctrl+C roi an Y");
