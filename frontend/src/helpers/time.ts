export const getTimeFromHoursAndMinutes = (hours: number, minutes: number) => {
  if (hours < 24 && hours >= 0 && minutes < 60 && minutes >= 0) {
    return (hours * 60 + minutes) * 60 * 1000
  }
  return undefined
}

// function returning the Date of start of the week, starting on friday lunch time
export const getStartOfTheWeek = (date: Date) => {
  const dayWhereWeekStart = 5
  const hoursWhereWeekStart = 12
  const currentDay = date.getDay()
  const currentHour = date.getHours()
  let toSubstract = -currentDay - 2
  if (currentDay >= dayWhereWeekStart && currentHour > hoursWhereWeekStart) {
    toSubstract = dayWhereWeekStart - currentDay
  }
  const diff = date.getDate() + toSubstract // adjust to go back to the last friday
  const friday = new Date(date.setDate(diff))
  friday.setHours(12, 0, 0, 0)
  return friday
}

export const getStartDay = () => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}

interface TimeComponents {
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}

export class Time implements TimeComponents {
  readonly hours: number
  readonly minutes: number
  readonly seconds: number
  readonly milliseconds: number

  constructor(timeString: string) {
    // Accept "09:00:00.000" or "09:00:00" format
    const [hours, minutes, secondsWithMs] = timeString.split(":")
    const [seconds, milliseconds] = (secondsWithMs || "0").split(".")

    this.hours = Number.parseInt(hours, 10)
    this.minutes = Number.parseInt(minutes, 10)
    this.seconds = Number.parseInt(seconds, 10)
    this.milliseconds = Number.parseInt(milliseconds || "0", 10)

    this.validate()
  }

  private validate(): void {
    if (this.hours < 0 || this.hours > 23) {
      throw new Error("Hours must be between 0 and 23")
    }
    if (this.minutes < 0 || this.minutes > 59) {
      throw new Error("Minutes must be between 0 and 59")
    }
    if (this.seconds < 0 || this.seconds > 59) {
      throw new Error("Seconds must be between 0 and 59")
    }
    if (this.milliseconds < 0 || this.milliseconds > 999) {
      throw new Error("Milliseconds must be between 0 and 999")
    }
  }

  toString(): string {
    return `${this.hours.toString().padStart(2, "0")}:${this.minutes
      .toString()
      .padStart(2, "0")}:${this.seconds.toString().padStart(2, "0")}.${this.milliseconds
      .toString()
      .padStart(3, "0")}`
  }

  toStringHHMM(): string {
    return `${this.hours.toString().padStart(2, "0")}h${this.minutes.toString().padStart(2, "0")}`
  }

  toSeconds(): number {
    return this.hours * 3600 + this.minutes * 60 + this.seconds + this.milliseconds / 1000
  }

  static fromSeconds(totalSeconds: number): Time {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = Math.floor(totalSeconds % 60)
    const milliseconds = Math.round((totalSeconds % 1) * 1000)

    return new Time(`${hours}:${minutes}:${seconds}.${milliseconds}`)
  }

  static isTimeCurrentlyHappening(timeStart: Time, timeEnd: Time): boolean {
    const now = new Date()
    const nowTime = new Time(`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`)
    return nowTime.isAfter(timeStart) && nowTime.isBefore(timeEnd)
  }

  add(otherTime: Time): Time {
    const totalSeconds = this.toSeconds() + otherTime.toSeconds()
    return Time.fromSeconds(totalSeconds % 86400) // Wrap around at 24 hours
  }

  subtract(otherTime: Time): Time {
    let totalSeconds = this.toSeconds() - otherTime.toSeconds()
    if (totalSeconds < 0) totalSeconds += 86400 // Handle negative times by wrapping around
    return Time.fromSeconds(totalSeconds)
  }

  // Optional comparison methods
  equals(otherTime: Time): boolean {
    return this.toSeconds() === otherTime.toSeconds()
  }

  isBefore(otherTime: Time): boolean {
    return this.toSeconds() < otherTime.toSeconds()
  }

  isAfter(otherTime: Time): boolean {
    return this.toSeconds() > otherTime.toSeconds()
  }
}
