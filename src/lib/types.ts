export type Department =
  | 'fussball'
  | 'volleyball'
  | 'tennis'
  | 'breitensport'
  | 'allgemein'

export interface BoardMember {
  name: string
  role: string
  department: 'vorstand' | Department
  image?: string
}

export interface Event {
  date: string
  title: string
  description: string
  department: Department
}

export interface HallSlot {
  day: 'mo' | 'di' | 'mi' | 'do' | 'fr' | 'sa' | 'so'
  startTime: string
  endTime: string
  group: string
  department: Department
}

export interface Sponsor {
  name: string
  logo?: string
}

export interface DepartmentInfo {
  id: Department
  label: string
  description: string
  head: string
}
