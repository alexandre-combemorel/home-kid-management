export const MAPPING_DAY_OF_THE_WEEK_REVERSE = {
  Vendredi: 5,
  Samedi: 6,
  Dimanche: 0,
  Lundi: 1,
  Mardi: 2,
  Mercredi: 3,
  Jeudi: 4,
}

type DaysName = keyof typeof MAPPING_DAY_OF_THE_WEEK_REVERSE

export const MAPPING_NUM_DAY_NAME_DAY_ORDERED: { num: number; name: DaysName; order: number }[] = [
  { num: 5, name: "Vendredi", order: 0 },
  { num: 6, name: "Samedi", order: 1 },
  { num: 0, name: "Dimanche", order: 2 },
  { num: 1, name: "Lundi", order: 3 },
  { num: 2, name: "Mardi", order: 4 },
  { num: 3, name: "Mercredi", order: 5 },
  { num: 4, name: "Jeudi", order: 6 },
]
