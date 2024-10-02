import { MusicTime } from "./interfaces/interfaces";

export const PLAYLIST1_DIR = "songs/playlist1";
export const PLAYLIST2_DIR = "songs/playlist2";
export const PLAYLIST3_DIR = "songs/playlist3";

export const MUSIC_TIMES: MusicTime[] = [
  {
    weekdays: "*",
    startTime: "11:18",
    endTime: "23:59",
    playlistPath: PLAYLIST1_DIR,
    priorSongPaths: ["songs/QuocCa.mp3"]
  },
  {
    weekdays: "1",
    startTime: "07:45",
    endTime: "08:15",
    playlistPath: PLAYLIST1_DIR,
    priorSongPaths: ["songs/QuocCa.mp3"],
  },

  { weekdays: "1,3,5", startTime: "07:45", endTime: "08:15", playlistPath: PLAYLIST1_DIR, shuffle: true },
  { weekdays: "2,4,6", startTime: "07:45", endTime: "08:15", playlistPath: PLAYLIST2_DIR, shuffle: true },
  { weekdays: "1,3,5", startTime: "16:30", endTime: "17:15", playlistPath: PLAYLIST3_DIR, shuffle: true },
  { weekdays: "2,4,6", startTime: "16:30", endTime: "17:15", playlistPath: PLAYLIST3_DIR, shuffle: true },
  { weekdays: "1,3,5", startTime: "09:50", endTime: "10:00", playlistPath: PLAYLIST1_DIR, shuffle: true },
  { weekdays: "2,4,6", startTime: "09:50", endTime: "10:00", playlistPath: PLAYLIST2_DIR, shuffle: true },
  { weekdays: "1,3,5", startTime: "14:50", endTime: "15:00", playlistPath: PLAYLIST1_DIR, shuffle: true },
  { weekdays: "2,4,6", startTime: "14:50", endTime: "15:00", playlistPath: PLAYLIST2_DIR, shuffle: true },
  {
    weekdays: "6",
    startTime: "16:30",
    endTime: "17:15",
    playlistPath: PLAYLIST2_DIR,
    priorSongPaths: ["songs/QuocCa.mp3"]
  },
];
