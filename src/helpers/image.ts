export const getImgUrl = (imgPath: string) => {
  return `${import.meta.env.VITE_BACKEND_URL}${imgPath}`
}
