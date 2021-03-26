export type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};

export default class TimeConverter {
  static toHHMMSS(seconds: number): Time {
    return {
      hours: Math.floor(seconds / 3600),
      minutes: Math.floor((seconds % 3600) / 60),
      seconds: Math.floor((seconds % 3600) % 60),
    };
  }

  static toSeconds(time: Time): number {
    return time.hours * 36000 + time.minutes * 60 + time.seconds;
  }

  static correct(time: Time): Time {
    return this.toHHMMSS(this.toSeconds(time));
  }
}
