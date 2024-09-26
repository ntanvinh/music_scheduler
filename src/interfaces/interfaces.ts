export interface MusicTime {
  weekdays: string; // day of week (0 - 7) (0 or 7 is Sun) cronjob
  startTime: string; // hh:mm
  endTime: string; // hh:mm
  playlistPath: string;
  priorSongPaths?: string[];
}
