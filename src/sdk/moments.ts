import { strapi } from "./base"
import type { Moment, Moments } from "./types"

export const getMoments = () => {
  return strapi.find<Moments>("moments", {
    populate: {
      img: {
        fields: "url",
      },
      tasks: {
        fields: "documentId",
      },
    },
  })
}

export const getMoment = (documentId: string) => {
  return strapi.findOne<Moment>("moments", documentId, {
    populate: {
      img: {
        fields: "url",
      },
      tasks: {
        populate: ["img", "actions"],
      },
    },
  })
}
