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

export const MAPPING_NUM_DAY_NAME_DAY_ORDERED: { num: number; name: DaysName }[] = [
  { num: 5, name: "Vendredi" },
  { num: 6, name: "Samedi" },
  { num: 0, name: "Dimanche" },
  { num: 1, name: "Lundi" },
  { num: 2, name: "Mardi" },
  { num: 3, name: "Mercredi" },
  { num: 4, name: "Jeudi" },
]
