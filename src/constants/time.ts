export const MAPPING_DAY_OF_THE_WEEK_REVERSE = {
  Ven: 5,
  Sam: 6,
  Dim: 0,
  Lun: 1,
  Mar: 2,
  Mer: 3,
  Jeu: 4,
}

type DaysName = keyof typeof MAPPING_DAY_OF_THE_WEEK_REVERSE

export const MAPPING_NUM_DAY_NAME_DAY_ORDERED: { num: number; name: DaysName }[] = [
  { num: 5, name: "Ven" },
  { num: 6, name: "Sam" },
  { num: 0, name: "Dim" },
  { num: 1, name: "Lun" },
  { num: 2, name: "Mar" },
  { num: 3, name: "Mer" },
  { num: 4, name: "Jeu" },
]
