export const getImgUrl = (imgPath: string) => {
  return new URL(imgPath, import.meta.env.VITE_BACKEND_URL).href
}
