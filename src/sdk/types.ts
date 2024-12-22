export type ImgType = {
  url: string
}

export type Action = {
  documentId: string
  title: string
}

export type Task = {
  documentId: string
  img: ImgType
  title: string
  actions: Action[]
}

export type Moment = {
  documentId: string
  label: string
  img: ImgType
  timeStart: string
  timeEnd: string
  tasks: Task[]
}

export type Score = {
  createdAt: Date
  documentId: string
  result: PayloadActions
  variation: number
  moment: Moment
}

export type Moments = Moment[]

export type PayloadActions = {
  [taskId: string]: { [actionId: string]: boolean }
}
