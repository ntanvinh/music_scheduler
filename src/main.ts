import scheduler from "node-schedule";
import { MUSIC_TIMES } from "./constants";
import { isPlayingPlaylist, playPlaylist } from "./utils/MusicUtils";
import { getCurrentTimeInMinutes, timestamp } from "./utils/DateUtils.ts";

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
    if (currentTimeInMinutes > startTimeInMinutes
      && currentTimeInMinutes < endTimeInMinutes
      && !isPlayingPlaylist()
    ) {
      await playPlaylist(musicTime, endTimeInMinutes);
    }

    console.log("Chay lich bat nhac:", musicTime);
    scheduler.scheduleJob(`${ startMinute } ${ startHour } * * ${ musicTime.weekdays }`, async () => {
      console.log(timestamp(), "Choi danh sach nhac");
      if (!isPlayingPlaylist()) {
        await playPlaylist(musicTime, endTimeInMinutes);
      }
    })
  }
  console.log("De dung chuong trinh vui long an Ctrl+C");
}

runMusicScheduler().then();
