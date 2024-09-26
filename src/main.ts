import player from "sound-play";
import fs from "fs";
import * as path from "node:path";
import scheduler from "node-schedule";
import { MusicTime } from "./interfaces/interfaces.ts";

const PLAYLIST1_DIR = "songs/playlist1";
const PLAYLIST2_DIR = "songs/playlist2";
const MUSIC_TIMES: MusicTime[] = [
  // {
  //   weekdays: "*",
  //   startTime: "23:01",
  //   endTime: "23:05",
  //   playlistPath: PLAYLIST1_DIR,
  //   priorSongPaths: ["songs/PriorSong.mp3"]
  // },
  {
    weekdays: "1",
    startTime: "07:50",
    endTime: "09:00",
    playlistPath: PLAYLIST1_DIR,
    priorSongPaths: ["songs/PriorSong.mp3"]
  },

  { weekdays: "2-6", startTime: "07:50", endTime: "09:00", playlistPath: PLAYLIST1_DIR },
  { weekdays: "1-5", startTime: "16:00", endTime: "17:15", playlistPath: PLAYLIST2_DIR },
  {
    weekdays: "6",
    startTime: "16:00",
    endTime: "17:15",
    playlistPath: PLAYLIST2_DIR,
    priorSongPaths: ["songs/PriorSong.mp3"]
  },
];

for (const musicTime of MUSIC_TIMES) {
  const startTimeParts = musicTime.startTime.split(":");
  const startHour = startTimeParts[0];
  const startMinute = startTimeParts[1];
  const endTimeParts = musicTime.endTime.split(":");
  const endHour = +endTimeParts[0];
  const endMinute = +endTimeParts[1];
  const endTimeInMinutes = endHour * 60 + endMinute;

  console.log("Run schedule job:", musicTime);
  scheduler.scheduleJob(`${ startMinute } ${ startHour } * * ${ musicTime.weekdays }`, async () => {
    console.log("Play music list");
    const playlist = fs.readdirSync(musicTime.playlistPath)
      .map(song => path.join(musicTime.playlistPath, song));
    let currentTimeInMinutes = new Date().getHours() * 60 + new Date().getMinutes();

    while (currentTimeInMinutes < endTimeInMinutes) {
      for (const song of [...musicTime.priorSongPaths ?? [], ...playlist]) {
        console.log("Playing", song);
        await player.play(song, 1).then();

        currentTimeInMinutes = new Date().getHours() * 60 + new Date().getMinutes();
        if (currentTimeInMinutes > endTimeInMinutes) {
          console.log("Stop playlist");
          break;
        }
      }
    }
  })
}




