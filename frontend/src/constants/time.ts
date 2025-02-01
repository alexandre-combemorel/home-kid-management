export const MAPPING_DAY_OF_THE_WEEK_REVERSE = {
  Debut: -1,
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
  { num: -1, name: "Debut", order: 0 },
  { num: 5, name: "Vendredi", order: 1 },
  { num: 6, name: "Samedi", order: 2 },
  { num: 0, name: "Dimanche", order: 3 },
  { num: 1, name: "Lundi", order: 4 },
  { num: 2, name: "Mardi", order: 5 },
  { num: 3, name: "Mercredi", order: 6 },
  { num: 4, name: "Jeudi", order: 7 },
]
