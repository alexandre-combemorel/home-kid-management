export const getTimeFromHoursAndMinutes = (hours: number, minutes: number) => {
  if (hours < 24 && hours >= 0 && minutes < 60 && minutes >= 0) {
    return (hours * 60 + minutes) * 60 * 1000
  }
  return undefined
}

// function returning the Date of start of the week, starting on friday lunch time
export const getStartOfTheWeek = (date: Date) => {
  const day = date.getDay()
  const diff = date.getDate() - day + (day === 0 ? -6 : 5) // adjust when day is sunday
  const friday = new Date(date.setDate(diff))
  friday.setHours(12, 0, 0, 0)
  return friday
}
