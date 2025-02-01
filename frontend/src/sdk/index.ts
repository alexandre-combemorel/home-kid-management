import { getMoments, getMoment } from "./moments"
import { setScore, getScoresForTheWeek } from "./score"
import { login, logout } from "./auth"
import { getUser } from "./user"
export const api = {
  getMoments,
  getMoment,
  setScore,
  getScoresForTheWeek,
  login,
  logout,
  getUser,
}
